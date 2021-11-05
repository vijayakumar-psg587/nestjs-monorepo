import { Module } from '@nestjs/common';
import { PinoLoggerService } from './services/logger/pino-logger.service';
import { AxiosConfigService } from './services/axios-config/axios-config.service';
import { AppUtilService } from './utils/app-util/app-util.service';
import { RetryService } from './services/retry/retry.service';

@Module({
	providers: [PinoLoggerService, AxiosConfigService, AppUtilService, RetryService],
	exports: [PinoLoggerService, AxiosConfigService, AppUtilService],
})
export class CommonModule {}
