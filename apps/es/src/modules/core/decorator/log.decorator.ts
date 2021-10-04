import { performance } from 'perf_hooks';
import { PinoLoggerService } from '@app/common';
import { COMMON_CONST } from '@app/common/utils/common.constants';
import { Client } from '@elastic/elasticsearch';
export const logDecorator = (className: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
	const originalMethod = descriptor.value;
	console.log('tager', target);
	console.log('prp:', propertyKey);
	console.log('desc:', descriptor.value);
	const infoLog = PinoLoggerService.getLoggerConfig('info', COMMON_CONST.COMMON.APP_NAME.ES);
	const errorLog = PinoLoggerService.getLoggerConfig('error', COMMON_CONST.COMMON.APP_NAME.ES);
	const methodName = propertyKey;

	let argsPassed: string[];
	let result: any;
	descriptor.value = async function (...args) {
		const start = performance.now();
		let finish;
		argsPassed =
			args && Array.isArray(args)
				? (() => {
						return args.map((arg) => {
							return typeof arg === 'object' ? (arg.constructor.name === 'Client' ? 'Connection details cannot be' + ' printed****' : JSON.stringify(arg)) : JSON.stringify(arg);
						});
				  })()
				: ['null'];
		infoLog.info(`Class: ${className} - Method- ${methodName} - Started execution with args: ${argsPassed}`);
		result = await originalMethod.apply(this, args).catch((err) => {
			finish = performance.now();
			errorLog.error(`Class: ${className} - Method- ${methodName} - Error executing with args: ${argsPassed} -  \n 
			Errored out in ${finish - start}ms \n
			Error:  ${JSON.stringify(err)}`);
			throw err;
		});

		finish = performance.now();
		infoLog.info(`Class: ${className} - Method- ${methodName} - \n 
		Execution time: ${finish - start} milliseconds - with args: ${argsPassed} 
		Result -  ${JSON.stringify(result)}`);
		return result;
	};
};
