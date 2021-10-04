import { Expose } from 'class-transformer';

export class PrimaryAttribSchema {
	@Expose({ name: '_index' })
	index: string;
	@Expose({ name: '_type' })
	type: string;
	@Expose({ name: '_id' })
	id: string;
	@Expose({ name: '_version' })
	version: number;
	@Expose({ name: '_seq_no' })
	seqNo?: number;
	@Expose({ name: '_primary_term' })
	primaryTerm?: number;
	found: boolean;
}
