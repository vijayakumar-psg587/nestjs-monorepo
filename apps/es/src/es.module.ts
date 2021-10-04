import { Module } from '@nestjs/common';
import { CoreModule } from './modules/core/core.module';
import { SearchModule } from './modules/search/search.module';

@Module({
	imports: [CoreModule, SearchModule],
})
export class EsModule {}
