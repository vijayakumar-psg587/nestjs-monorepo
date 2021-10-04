import { Module } from '@nestjs/common';
import { UtilService } from './services/util/util.service';
import { CrudService } from './services/crud/crud.service';
import { CoreModule } from '../core/core.module';

@Module({
	providers: [UtilService, CrudService],
	imports: [CoreModule],
})
export class SearchModule {}
