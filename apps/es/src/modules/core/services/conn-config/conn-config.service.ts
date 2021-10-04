import { Injectable, Scope } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { ESConfigService } from '../es-config/es-config.service';
import { ESConfigModel } from '../../models/es.config.model';
import { v4 as uuidv4 } from 'uuid';
import { COMMON_CONST } from '@app/common/utils/common.constants';
@Injectable({
	scope: Scope.TRANSIENT,
})
export class ConnConfigService {
	private esConfig: ESConfigModel;
	private static esClient: Client;
	constructor(private configService: ESConfigService) {
		this.esConfig = this.configService.getESConfigModel();
	}

	public async getElasticClient(): Promise<Client> {
		return new Promise((resolve, reject) => {
			if (!ConnConfigService.esClient) {
				ConnConfigService.esClient = new Client({
					generateRequestId: (params, options) => {
						return uuidv4().toString();
					},
					maxRetries: this.esConfig.esRetries ?? 3,
					headers: { 'app-name': COMMON_CONST.COMMON.APP_NAME.ES },
					node: this.esConfig.esCluster + COMMON_CONST.CHAR.COLON + this.esConfig.esPort,
					// auth: {
					// 	username: '',
					// 	password: '',
					// },
				});
			}

			resolve(ConnConfigService.esClient);
		});
	}
}
