import { Injectable } from '@nestjs/common';
import { Movie } from '../movie/movie.model';
import { Neo4jService } from '../neo4j/neo4j.service';
import { Person, Relation } from './person.model';

@Injectable()
export class PersonService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async findByMovie(
    movie_id: number,
  ): Promise<{ person: Person; relation: Relation }[]> {
    const queryResults = await this.neo4jService.read(
      `
      MATCH (movie:Movie)<-[relation]-(person:Person)
      WHERE id(movie) = $movie_id
      RETURN person, relation
      `,
      { movie_id },
    );

    const result: { person: Person; relation: Relation }[] =
      queryResults.records.map((record) => ({
        person: new Person(record),
        relation: new Relation(record),
      }));

    return result;
  }

  async findByPerson(
    person_id: number,
  ): Promise<{ person: Person; relation: Relation; movie: Movie }[]> {
    const queryResults = await this.neo4jService.read(
      `
      MATCH (person:Person)-[relation]->(movie:Movie)
      WHERE id(person) = $person_id
      RETURN person, relation, movie
      `,
      { person_id },
    );

    const result: { person: Person; relation: Relation; movie: Movie }[] =
      queryResults.records.map((record) => ({
        person: new Person(record),
        relation: new Relation(record),
        movie: new Movie(record),
      }));

    return result;
  }
}
