import { forwardRef, Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './modules/common/common.module';
import { ApiModule } from './modules/api/api.module';
@Module({
	imports: [CommonModule, ApiModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
