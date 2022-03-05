import { Movie } from "./movie.dto";

export interface Person {
  id: number;
  name: string;
  born: number;
}

export interface Relation {
  id: number;
  type: string;
  roles?: string[];
}

export type PersonRelation = { person: Person; relation: Relation };
export type PersonRelationMovie = {
  person: Person;
  relation: Relation;
  movie: Movie;
};
