import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Movies {
	@Field()
	name: string;
	@Field()
	createdDate: string;
	@Field((type) => Int, { nullable: true })
	id?: number;
}
