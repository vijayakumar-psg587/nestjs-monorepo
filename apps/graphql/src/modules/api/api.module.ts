import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MovieService } from './services/gql/movie/movie.service';
import * as path from 'path';
import { MoviesResolver } from './services/gql/resolvers/movies-resolver';

@Module({
	imports: [
		GraphQLModule.forRoot({
			disableHealthCheck: true,
			autoSchemaFile: path.join(process.cwd(), 'apps/graphql/src/schema/schema.gql'),
		}),
	],
	providers: [MovieService, MoviesResolver],
})
export class ApiModule {}
