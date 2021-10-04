import { Expose, Type } from 'class-transformer';
import { PrimaryAttribSchema } from './primary-attrib.schema';
import { MovieSourceSchema } from './movie-source.schema';

export class MovieSchema extends MovieSourceSchema {}

export class MovieResponseSchema extends PrimaryAttribSchema {
	@Expose({ name: '_source' })
	@Type(() => MovieSourceSchema)
	source: MovieSourceSchema;
}
