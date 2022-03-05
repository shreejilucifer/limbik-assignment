import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
  constructor(private personService: PersonService) {}

  @Get('/')
  getAllPersonByMovie(@Query('movie_id', ParseIntPipe) movie_id: number) {
    return this.personService.findByMovie(movie_id);
  }
}
