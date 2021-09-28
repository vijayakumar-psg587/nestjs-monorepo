import { Injectable, Scope } from '@nestjs/common';
import { AppConfigModel } from '../../models/app.config.model';
import { APP_CONST } from '../../utils/app.constants';

@Injectable({
	scope: Scope.DEFAULT,
})
export class AppConfigService {
	static appConfigModel: AppConfigModel;
	static getAppConfig(): AppConfigModel {
		console.log('first in here');
		if (!this.appConfigModel) {
			console.log('in here');
			this.appConfigModel = new AppConfigModel();
			this.appConfigModel.contextPath = APP_CONST.COMMON.APP_CONTEXT;
			this.appConfigModel.retries = +process.env.HTTP_RETRIES;
			console.log('after re:', this.appConfigModel);
			this.appConfigModel.port = process.env.APP_PORT ? process.env.APP_PORT : APP_CONST.COMMON.DEFAULT_APP_PORT;
			this.appConfigModel.host = process.env.APP_HOST ? process.env.APP_HOST : APP_CONST.COMMON.DEFAULT_APP_HOST;
			console.log('after host:', this.appConfigModel);
			this.appConfigModel.appVersion = process.env.APP_VERSION;
			this.appConfigModel.timeout = +process.env.HTTP_TIMEOUT;
			this.appConfigModel.maxRedirects = +process.env.HTTP_MAX_REDIRECTS;
			this.appConfigModel.maxSockets = +process.env.HTTP_MAX_SOCKETS;
			console.log('after maxsoc:', this.appConfigModel);
		}
		return this.appConfigModel;
	}
}
