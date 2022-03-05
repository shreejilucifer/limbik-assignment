import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
  constructor(private personService: PersonService) {}

  @Get('/')
  getAllByMovie(@Query('movie_id', ParseIntPipe) movie_id: number) {
    return this.personService.findByMovie(movie_id);
  }

  @Get(':person_id')
  getAllByPerson(@Param('person_id', ParseIntPipe) person_id: number) {
    return this.personService.findByPerson(person_id);
  }
}
