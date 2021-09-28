import { PinoLoggerService } from '../services/logger/logger.service';
import { performance } from 'perf_hooks';
export const logDecorator =
  (className: string) =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    const infoLog = PinoLoggerService.getLoggerConfig('info');
    const methodName = propertyKey;

    let argsPassed: string;
    let result: any;
    descriptor.value = async function (...args) {
      const proxy = new Proxy(originalMethod, {
        apply: function (target, thisArgs, arg) {
          // Function can be made to follow aysnc await
          argsPassed = JSON.stringify(arg);
          return target(...arg);
        },
      });
      const start = performance.now();

      result = await proxy.apply(this, args);
      infoLog.info(
        `Class: ${className} - Method- ${methodName} - Started execution with args: ${argsPassed}`,
      );
      const finish = performance.now();
      infoLog.info(
        `Class: ${className} - Method- ${methodName} - Execution time: ${
          finish - start
        } milliseconds - with args: ${argsPassed}`,
      );
      return result;
    };
  };
