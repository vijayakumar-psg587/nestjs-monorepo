import cors from 'fastify-cors';

import { v4 as uuidv4 } from 'uuid';
import { AppConfigService } from './modules/common/services/app-config/app-config.service';
import { FastifyAdapter } from '@nestjs/platform-fastify';
export class ServerAdapterService {
	constructor() {}

	//   static async configureCors(app: FastifyInstance): Promise<void> {
	//     // eslint-disable-next-line @typescript-eslint/no-var-requires
	//     await app.register(cors);
	//   }

	static getAdapter(): FastifyAdapter {
		const appConfig = AppConfigService.getAppConfig();
		return new FastifyAdapter({
			ignoreTrailingSlash: false,
			caseSensitive: true,
			genReqId: () => uuidv4().toString(),
			trustProxy: true,
			pluginTimeout: appConfig.timeout,
			requestIdHeader: 'req-id',
		});
	}
}
