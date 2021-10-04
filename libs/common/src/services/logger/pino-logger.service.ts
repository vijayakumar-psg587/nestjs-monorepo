import { Injectable, LoggerService } from '@nestjs/common';
import * as os from 'os';
import { AppUtilService } from '@app/common/utils/app-util/app-util.service';
import * as pino from 'pino';
import { COMMON_CONST } from '@app/common/utils/common.constants';
@Injectable()
export class PinoLoggerService implements LoggerService {
	static getLoggerConfig(level: string, appName: string, redactKeys?: string[]): pino.BaseLogger {
		return pino({
			useLevelLabels: true,
			prettyPrint: (() => {
				return process.env.NODE_ENV && process.env.NODE_ENV === 'dev';
			})(),
			// tslint:disable-next-line: object-literal-sort-keys
			messageKey: appName + '-message',
			level: level,
			redact: {
				paths: (() => redactKeys ?? COMMON_CONST.COMMON.REDACT_DEFAULT)(),
				censor: '****',
			},
			base: {
				hostName: os.hostname(),
				platform: os.platform(),
				processId: process.pid,
				timestamp: AppUtilService.getAppLevelDefaultUTCTime(),
			},
		});
	}

	error(message: any, ...optionalParams: any[]): any {
		PinoLoggerService.getLoggerConfig(optionalParams['level'], optionalParams['appName']).error(message);
	}

	log(message: any, ...optionalParams: any[]): any {
		PinoLoggerService.getLoggerConfig(optionalParams['level'], optionalParams['appName']).info(message);
	}

	warn(message: any, ...optionalParams: any[]): any {
		PinoLoggerService.getLoggerConfig(optionalParams['level'], optionalParams['appName']).warn(message);
	}

	debug(message: any, ...optionalParams: any[]): any {
		PinoLoggerService.getLoggerConfig(optionalParams['level'], optionalParams['appName']).debug(message);
	}
}
