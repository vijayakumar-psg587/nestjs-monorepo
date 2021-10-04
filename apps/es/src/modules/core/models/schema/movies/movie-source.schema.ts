import { Expose, Type } from 'class-transformer';
import { IsArray } from 'class-validator';

export class MovieSourceSchema {
	@Expose()
	id?: string;
	@Expose()
	title?: string;
	@Expose()
	year?: number;
	@Expose()
	@IsArray({ always: true })
	@Type(() => String)
	genre?: string[];
}
