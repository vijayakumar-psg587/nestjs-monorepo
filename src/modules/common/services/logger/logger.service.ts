import { Injectable, Scope } from '@nestjs/common';
import pino from 'pino';
import * as os from 'os';
import { APP_CONST } from '../../utils/app.constants';
import { AppUtilService } from '../app-util/app-util.service';

@Injectable({
  scope: Scope.DEFAULT,
})
export class PinoLoggerService {
  constructor() {}

  static getLoggerConfig(level: string): pino.BaseLogger {
    return pino({
      useLevelLabels: true,
      prettyPrint: (() => {
        return process.env.NODE_ENV && process.env.NODE_ENV == 'dev'
          ? true
          : false;
      })(),
      // tslint:disable-next-line: object-literal-sort-keys
      messageKey: APP_CONST.COMMON.APP_NAME + 'key',
      level: level,
      redact: {
        paths: APP_CONST.COMMON.REDACT,
        censor: '****',
      },
      base: {
        hostName: os.hostname(),
        platform: os.platform(),
        processId: process.pid,
        timestamp: AppUtilService.getDefaultUTCTime,
      },
    });
  }
}
