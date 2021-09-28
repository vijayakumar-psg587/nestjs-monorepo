import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './modules/common/common.module';
import { ApiModule } from './modules/api/api.module';
import { DatabaseModule } from './modules/database/database.module';
@Module({
	imports: [CommonModule, ApiModule, DatabaseModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
