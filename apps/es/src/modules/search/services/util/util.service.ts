import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ApiResponse, Client } from '@elastic/elasticsearch';
import { logDecorator } from '../../../core/decorator/log.decorator';
import { EsErrorEnum } from '../../../core/models/enums/es-error.enum';
import { CustomErrorModel } from '../../../../../../graphql/src/modules/common/models/exception/custom-error.model';
import { ES_CONST } from '../../../core/util/es.constants';
import { plainToClass } from 'class-transformer';
import { MovieResponseSchema, MovieSchema } from '../../../core/models/schema/movies/movie.schema';

@Injectable()
export class UtilService {
	private static fetchMoviesData(): string {
		const movieData = fs.readFileSync(path.join(process.cwd(), './apps/es/dataSet/movies.json')).toString('utf-8');
		return movieData;
	}

	@logDecorator('UtilService')
	public static createIndex(indexName: string, sourceName: string, client: Client, typeSchema: unknown): Promise<ApiResponse<Record<any, string>>> {
		if (!typeSchema) {
			typeSchema = {
				id: { type: 'integer', index: true },
				title: { type: 'text' },
				year: { type: 'integer' },
				v: { type: 'version' },
				genre: { type: 'text' },
			};
		}
		return Promise.resolve(
			client.indices.create({
				index: indexName,
				source: 'test', // any source like name of the database from where the details come from
				wait_for_active_shards: '1', // wait until atleast 3 shards in any given connection to be avaialble before proceeding.
				// In production should be set to atleast 3 or higher
				error_trace: true,
				pretty: true,
			}),
		);
	}

	@logDecorator('UtilService')
	public static checkIfIndexExists(indexNameToCheck: string, client: Client): Promise<unknown> {
		return new Promise(async (resolve, reject) => {
			try {
				const isIndexAvailable = await client.cat.indices({ index: indexNameToCheck });
				if (isIndexAvailable.statusCode === 200) {
					resolve('Available');
				}
			} catch (err) {
				console.log('Searched Index is not available');
				reject('Unavailable');
			}
		});
	}

	@logDecorator('UtilService')
	public static async getDocById(idToFetch: string, docType: string, index: string, client: Client) {
		return new Promise(async (resolve, reject) => {
			if (client) {
				const result = await client
					.get({
						index: index,
						id: idToFetch,
						pretty: !!(process.env && process.env.NODE_DEV),
						error_trace: true,
					})
					.catch((err) => {
						console.log('err caught in getting details:', err);
						reject(new CustomErrorModel('421', err.message, 421));
					});
				resolve(result);
			} else {
				reject(new CustomErrorModel('500', 'No Client connection found', 500));
			}
		});
	}

	@logDecorator('UtilService')
	public static async updatePartialData(idToUpdate: string, type: string, index: string, client: Client) {
		// Now elastic search has something called optimistic concurrency.
		// incase if multiple client instances are trying to update the same document , one would inevitably will get the stale data
		// which is not what we wanted. Hence we have this metadata called if seq no and if primary term which are accompanied by default
		// at the shard level . They get updated based on the number of actions that were executed on that shard - create, update,
		// delete and so on

		// but to get that first one has to get that value for the document

		return new Promise(async (resolve, reject) => {
			if (client) {
				const docDetails = await this.getDocById(idToUpdate, type, index, client).catch((err) => {
					reject(err);
				});

				const movieDetails = plainToClass(MovieResponseSchema, docDetails['body']);
				const mvUpdateObj: MovieSchema = {
					title: 'Updated - ' + movieDetails.source.title,
				};
				const updateResult = await client
					.update({
						index: index,
						id: idToUpdate,

						if_primary_term: movieDetails.primaryTerm,
						if_seq_no: movieDetails.seqNo,
						// i am doing a full update but partial updates are also accpeted
						body: {
							doc: mvUpdateObj,
						},
					})
					.catch((err) => {
						console.log('err in updating the doc:', err);
						reject(new CustomErrorModel('421', err, 421));
					});

				resolve(updateResult);
			} else {
				reject(new CustomErrorModel('500', 'No Client connection found', 500));
			}
		});
	}

	@logDecorator('UtilService')
	public static async insertBulkData(indexToInsert: string, sourceName: string, client: Client): Promise<unknown> {
		return new Promise(async (resolve, reject) => {
			const dataToInsert = UtilService.fetchMoviesData();
			/**
			 * Important things to remember  -
			 * Always make sure to insert newLIne at the end of data for bulkInsert
			 * Always make sure that it is not actual JSON formatted data but just a string similar to JSON
			 * we are inserting, so remember to refer to the one provided in movies.json
			 */
			const { body: bulkResponse } = await client.bulk({
				_source: sourceName,
				index: indexToInsert,
				pretty: true,
				body: dataToInsert,
			});

			if (bulkResponse.errors) {
				const erroredDocuments = [];
				const updatedDocList = [];
				// The items array has the same order of the dataset we just indexed.
				// The presence of the `error` key indicates that the operation
				// that we did for the document has failed.
				for (const action of bulkResponse.items) {
					const i = bulkResponse.items.indexOf(action);
					const operation = Object.keys(action)[0];
					// remember each error is of its own, so if the type of errir resembles version conflict
					if (action[operation]?.status === EsErrorEnum.VERSION_CONFLICT && action[operation]?.error?.type === ES_CONST.ERRORS.VERSION_CONFLICT_ERROR) {
						// then try updating the existing document -  best case scenario is to check if the document exists
						// before insertion but to check each and every document, ideally it will take longer,
						// so using this pattern of reindexing only failed ones makes a better approach
						// again it depends on the use case
						const updateRes = await this.updatePartialData(action[operation]._id, action[operation]._type, action[operation]._index, client).catch((err) => {
							erroredDocuments.push({
								status: err.status,
								error: err.message,
							});
						});
						updatedDocList.push(updateRes);
					} else {
						erroredDocuments.push({
							// If the status is 429 it means that you can retry the document,
							// otherwise it's very likely a mapping error, and you should
							// fix the document before to try it again.
							status: action[operation].status,
							error: action[operation].error,
						});
					}
				}
				if (erroredDocuments && erroredDocuments.length >= 1) {
					reject(erroredDocuments);
				} else {
					resolve([...updatedDocList]);
				}
			} else {
				resolve(bulkResponse);
			}
		});
	}
}
