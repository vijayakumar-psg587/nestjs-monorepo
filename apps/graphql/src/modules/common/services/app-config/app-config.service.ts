import { Injectable, Scope } from '@nestjs/common';
import { AppConfigModel } from '../../models/app.config.model';
import { APP_CONST } from '../../utils/app.constants';
import { COMMON_CONST } from '@app/common/utils/common.constants';
import { AppMongoConfigModel } from '../../models/app.mongo.config.model';

@Injectable({
	scope: Scope.DEFAULT,
})
export class AppConfigService {
	static appConfigModel: AppConfigModel;
	static appMongoConfigModel: AppMongoConfigModel;
	static getAppConfig(): AppConfigModel {
		if (!this.appConfigModel) {
			this.appConfigModel = new AppConfigModel();
			this.appConfigModel.contextPath = COMMON_CONST.COMMON.CONTEXT.GRAPH_QL;
			this.appConfigModel.retries = +process.env.HTTP_RETRIES;

			this.appConfigModel.port = process.env.APP_PORT ? process.env.APP_PORT : APP_CONST.COMMON.DEFAULT_APP_PORT;
			this.appConfigModel.host = process.env.APP_HOST ? process.env.APP_HOST : APP_CONST.COMMON.DEFAULT_APP_HOST;

			this.appConfigModel.appVersion = process.env.APP_VERSION;
			this.appConfigModel.timeout = +process.env.HTTP_TIMEOUT;
			this.appConfigModel.maxRedirects = +process.env.HTTP_MAX_REDIRECTS;
			this.appConfigModel.maxSockets = +process.env.HTTP_MAX_SOCKETS;
		}
		return this.appConfigModel;
	}

	static getAppMongoConfig(): AppMongoConfigModel {
		if (!this.appMongoConfigModel) {
			this.appMongoConfigModel = new AppMongoConfigModel();
			this.appMongoConfigModel.database = process.env.MONGO_DB_DATABASE;
			this.appMongoConfigModel.cluster = process.env.MONGO_DB_CLUSTER;
			this.appMongoConfigModel.clusterOptions = process.env.MONGO_DB_CLUSTER_OPTIONS;
			this.appMongoConfigModel.protocol = process.env.MONGO_DB_PROTOCOL;
			this.appMongoConfigModel.userName = process.env.MONGO_DB_USERNAME;
			this.appMongoConfigModel.password = process.env.MONGO_DB_PASSWORD;
			this.appMongoConfigModel.connectionTm = +process.env.MONGO_DB_CONNECTION_TM ?? 7000;
			this.appMongoConfigModel.keepAlive = process.env.MONGO_DB_KEEPALIVE ? process.env.MONGO_DB_KEEPALIVE === 'true' : false;
		}
		return this.appMongoConfigModel;
	}
}
