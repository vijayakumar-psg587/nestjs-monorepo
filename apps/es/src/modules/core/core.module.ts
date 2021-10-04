import { Module } from '@nestjs/common';
import { ESConfigService } from './services/es-config/es-config.service';
import { ConnConfigService } from './services/conn-config/conn-config.service';

@Module({
	providers: [ESConfigService, ConnConfigService],
	exports: [ESConfigService, ConnConfigService],
})
export class CoreModule {}
