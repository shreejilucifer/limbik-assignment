import { Record } from 'neo4j-driver';

export class Person {
  id: number;
  name: string;
  born?: number;

  constructor(record: Record) {
    const { properties, identity } = record.get('person');
    this.id = identity.low;
    this.name = properties.name;
    this.born = properties.born?.low;
  }
}

export class Relation {
  id: number;
  type: string;
  roles?: string[];

  constructor(record: Record) {
    const { type, properties, identity } = record.get('relation');
    this.id = identity.low;
    this.type = type;
    this.roles = properties.roles;
  }
}
