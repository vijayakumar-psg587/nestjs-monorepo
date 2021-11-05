import { Resolver, Query, GqlExecutionContext } from '@nestjs/graphql';
import { Movies } from '../../../model/gql/movies-query';
import { MovieService } from '../movie/movie.service';

@Resolver((of) => Movies)
export class MoviesResolver {
	constructor(private movieService: MovieService) {}

	@Query((returns) => [Movies], { name: 'movies' })
	async getMovies(context: GqlExecutionContext): Promise<Movies[]> {
		console.log('getting gql context:', context);
		return await this.movieService.findAll();
	}
}
