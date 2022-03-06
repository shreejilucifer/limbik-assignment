import { Record } from 'neo4j-driver';

export class Movie {
  id: number;
  tagline: string;
  title: string;
  released: number;

  constructor(record: Record) {
    const { properties, identity } = record.get('movie');
    this.id = identity.toNumber();
    this.title = properties.title;
    this.tagline = properties.tagline;
    this.released = properties.released.toNumber();
  }
}
