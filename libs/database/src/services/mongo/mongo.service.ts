import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { PinoLoggerService } from '@app/common';
@Injectable()
export class MongoService {
	constructor() {}
	static async getMongoConnection(connUrl: string, connTimeOutMs: number, keepAlive: boolean) {
		mongoose.set('bufferCommands', false);
		return new Promise((resolve, reject) => {
			mongoose
				.connect(connUrl, { logger: PinoLoggerService, useNewUrlParser: true, useUnifiedTopology: true, writeConcern: { w: 'majority', j: true } })
				.then((connDetails) => {
					resolve(connDetails);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}
}
