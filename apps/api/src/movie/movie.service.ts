import { Injectable } from '@nestjs/common';
import { Neo4jService } from '../neo4j/neo4j.service';
import { GetMovieByReleaseQueryDTO } from './dto/get-movies.dto';
import { Movie } from './movie.model';

@Injectable()
export class MovieService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async findAll({
    start_year,
    end_year,
  }: GetMovieByReleaseQueryDTO): Promise<Movie[]> {
    const queryResults = await this.neo4jService.read(
      `
        MATCH (movie:Movie)
        WHERE movie.released >= $start_year AND movie.released <= $end_year
        RETURN movie
      `,
      { start_year, end_year },
    );

    const movies: Movie[] = queryResults.records.map(
      (record) => new Movie(record),
    );

    return movies;
  }
}
