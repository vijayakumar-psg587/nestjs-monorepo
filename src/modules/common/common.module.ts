import { Module } from '@nestjs/common';
import { CustomExceptionFilter } from './filters/custom-exception.filter';
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { AppConfigService } from './services/app-config/app-config.service';
import { AppUtilService } from './services/app-util/app-util.service';
import { PinoLoggerService } from './services/logger/logger.service';

@Module({
	providers: [AppConfigService, AppUtilService, PinoLoggerService, HeaderInterceptor, CustomExceptionFilter],
})
export class CommonModule {}
