import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetMovieByReleaseQueryDTO } from './dto/get-movies.dto';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get('/')
  @UsePipes(new ValidationPipe({ transform: true }))
  getAllMovies(@Query() query: GetMovieByReleaseQueryDTO) {
    return this.movieService.findAll({
      start_year: query.start_year,
      end_year: query.end_year,
    });
  }
}
