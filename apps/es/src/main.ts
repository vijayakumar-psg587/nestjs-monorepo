import { NestFactory } from '@nestjs/core';
import { EsModule } from './es.module';
import { PinoLoggerService } from '@app/common';
import { Client } from '@elastic/elasticsearch';
import { CrudService } from './modules/search/services/crud/crud.service';
import { CoreModule } from './modules/core/core.module';
import { ConnConfigService } from './modules/core/services/conn-config/conn-config.service';
import 'reflect-metadata';
let app;
(async function bootstrap() {
	let esConn: Client = null;
	app = await NestFactory.createApplicationContext(EsModule);
	const logObj = new PinoLoggerService();
	app.useLogger(logObj);
	// Now call esService to create connection
	const esConfigService = app.select(CoreModule).resolve(ConnConfigService);
	esConn = await (await esConfigService).getElasticClient().catch((err) => {
		process.stderr.write(`Connection failed: ${err}`);
		process.exit(1);
	});

	const esCrdService: CrudService = await app.select(EsModule).resolve(CrudService);
	//await esCrdService.createIndex('test-tweet', 'http://test');
	//app.enableShutdownHooks() -  This doesnt work for standlone apps
	await esCrdService.insertBulkData('movies', 'http://sundog.media/movies');
	await app
		.close()
		.then(async (data) => {
			// closing esConn
			await esConn.close();
		})
		.catch(async (err) => {
			await esConn.close();
			// there is error in closing the app
			process.stderr.write(`Error in closing the app: ${err.message}`);
			process.exit(1);
		});
})();

process.on('SIGINT', (signal) => {
	process.stderr.write(`Received signal: ${signal} : Closing the app`);
	process.exit(1);
});

process.on('unhandledRejection', (err) => {
	process.stderr.write(`Unhandled rejection received: ${err['message']} : Closing the app`);
	process.exit(1);
});
