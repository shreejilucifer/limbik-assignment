import { Injectable } from '@nestjs/common';
import { Neo4jService } from '../neo4j/neo4j.service';
import { Person, Relation } from './person.model';

@Injectable()
export class PersonService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async findByMovie(
    movie_id: number,
  ): Promise<{ person: Person; relation: Relation }[]> {
    let queryResults = await this.neo4jService.read(
      `
      MATCH (movie:Movie)<-[relation]-(person:Person)
      WHERE id(movie) = $movie_id
      RETURN person, relation
      `,
      { movie_id },
    );

    console.log(queryResults.records[0].get('person'));

    const result: { person: Person; relation: Relation }[] =
      queryResults.records.map((record) => ({
        person: new Person(record),
        relation: new Relation(record),
      }));

    return result;
  }
}
