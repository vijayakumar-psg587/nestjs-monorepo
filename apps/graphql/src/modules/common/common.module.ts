import { Module } from '@nestjs/common';
import { CustomExceptionFilter } from './filters/custom-exception.filter';
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { AppConfigService } from './services/app-config/app-config.service';
import { ExceptionValidatorService } from './validators/exception-validator/exception-validator.service';
import { CorsInterceptor } from './interceptors/cors.interceptor';
@Module({
	providers: [AppConfigService, HeaderInterceptor, CustomExceptionFilter, ExceptionValidatorService, CorsInterceptor],
})
export class CommonModule {}
