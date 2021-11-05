import { Injectable, Scope } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { ConnConfigService } from '../../../core/services/conn-config/conn-config.service';
import { UtilService } from '../util/util.service';
import { logDecorator } from '../../../core/decorator/log.decorator';
import { CustomErrorModel } from '../../../../../../graphql/src/modules/common/models/exception/custom-error.model';

@Injectable({
	scope: Scope.REQUEST,
})
export class CrudService {
	constructor(private readonly connService: ConnConfigService) {}

	private async getClient(): Promise<Client> {
		try {
			return await this.connService.getElasticClient();
		} catch (err) {
			return null;
		}
	}
	/**
	 * Create specified index
	 */
	@logDecorator(CrudService.name)
	public async createIndex(indexName: string, sourceName: string): Promise<unknown> {
		return new Promise(async (resolve, reject) => {
			const client = await this.getClient();
			if (client) {
				// first create index
				// Body should contain params for the new idnex
				//const indexDetails = await EsUtilService.createIndex(indexName, sourceName, this.client, null);
				//console.log(indexDetails.body);
				await UtilService.checkIfIndexExists(indexName, client)
					.then((data) => {
						resolve(data);
					})
					.catch(async (err) => {
						// if rejected it means no index exits, so proceed with creating one

						try {
							const indexResult = await UtilService.createIndex(indexName, sourceName, client, null);
							console.log('Index result is:', indexResult);
							if (indexResult.statusCode === 200) {
								resolve(indexResult.body);
							}
						} catch (err) {
							console.log('err in creating index:', err);
							reject(err);
						}
					});
			} else {
				reject(new CustomErrorModel('500', 'DB', 'No client identified', 500));
			}
		});
	}

	@logDecorator('CrudService')
	public async insertBulkData(index: string, sourceName: string): Promise<unknown> {
		return new Promise(async (resolve, reject) => {
			// first check if index is available
			const client = await this.getClient();
			if (client) {
				await UtilService.checkIfIndexExists(index, client)
					.then(async (data) => {
						return await this.abstractBulkInsertion(index, sourceName, client);
					})
					.catch(async (err) => {
						const indexResult = await this.createIndex(index, null).catch((idxCreateErr) => {
							console.log('Error creating index:', err);
							reject(idxCreateErr);
						});
						if (indexResult) {
							// means index created successfully, so proceed inserting data
							return await this.abstractBulkInsertion(index, sourceName, client);
						}
					});
			} else {
				reject(new CustomErrorModel('500', 'DB', 'No client identified', 500));
			}
		});
	}

	private async abstractBulkInsertion(index: string, sourceName: string, client: Client) {
		return new Promise(async (resolve, reject) => {
			const insertResult = await UtilService.insertBulkData(index, sourceName, client).catch((err) => {
				reject(err);
			});
			if (insertResult) {
				resolve(insertResult);
			}
		});
	}
}
