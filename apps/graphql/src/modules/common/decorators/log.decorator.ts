import { performance } from 'perf_hooks';
import { PinoLoggerService } from '@app/common';
import { COMMON_CONST } from '@app/common/utils/common.constants';
export const logDecorator = (className: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
	const originalMethod = descriptor.value;
	const infoLog = PinoLoggerService.getLoggerConfig('info', COMMON_CONST.COMMON.APP_NAME.GRAPH_QL);
	const errorLog = PinoLoggerService.getLoggerConfig('error', COMMON_CONST.COMMON.APP_NAME.GRAPH_QL);
	const methodName = propertyKey;

	let argsPassed: string;
	let result: any;
	descriptor.value = async function (...args) {
		const proxy = new Proxy(originalMethod, {
			apply: function (target, thisArgs, arg) {
				// Function can be made to follow async await
				argsPassed = JSON.stringify(arg);
				return target(...arg);
			},
		});
		const start = performance.now();

		infoLog.info(`Class: ${className} - Method- ${methodName} - Started execution with args: ${argsPassed}`);
		result = await proxy.apply(this, args).catch((err) => {
			const finish = performance.now();
			errorLog.error(`Class: ${className} - Method- ${methodName} - Error executing with args: ${argsPassed} \n
				Exec Time: ${finish - start} milliseconds: \n
				Error: ${err}`);
			throw err;
		});

		const finish = performance.now();
		infoLog.info(`Class: ${className} - Method- ${methodName} - Execution time: ${finish - start} milliseconds - with args: ${argsPassed}`);
		return result;
	};
};
