import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get('/')
  getAllMovies(
    @Query('start_year', ParseIntPipe) start_year: number,
    @Query('end_year', ParseIntPipe) end_year: number,
  ) {
    return this.movieService.findAll({
      start_year: start_year,
      end_year: end_year,
    });
  }
}
