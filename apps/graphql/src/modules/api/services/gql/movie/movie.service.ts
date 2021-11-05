import { Injectable, Scope } from '@nestjs/common';
import { Movies } from '../../../model/gql/movies-query';
import { MovieDbModel } from '../../../model/db/movie-db.model';

@Injectable({
	scope: Scope.REQUEST,
})
export class MovieService {
	constructor() {}

	async findAll(): Promise<Movies[]> {
		const val = await MovieDbModel.find().catch((err) => console.log(err));
		console.log('val:', val);
		const movie = new Movies();
		movie.id = 1;
		movie.name = 'sample';
		movie.createdDate = 'test Date';
		return [movie];
	}
}
