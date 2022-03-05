import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import neo4j, { Driver, Result, Session } from 'neo4j-driver';
import { Neo4jConfig } from './neo4j-config.interface';
import { NEO4J_CONFIG, NEO4J_DRIVER } from './neo4j.constants';

@Injectable()
export class Neo4jService implements OnApplicationShutdown {
  constructor(
    @Inject(NEO4J_CONFIG) private readonly config: Neo4jConfig,
    @Inject(NEO4J_DRIVER) private readonly driver: Driver,
  ) {}

  onApplicationShutdown(signal?: string) {
    return this.driver.close();
  }

  getDriver(): Driver {
    return this.driver;
  }

  getConfig(): Neo4jConfig {
    return this.config;
  }

  getReadSession(database?: string): Session {
    return this.driver.session({
      database: database || this.config.database,
      defaultAccessMode: neo4j.session.READ,
    });
  }

  getWriteSession(database?: string): Session {
    return this.driver.session({
      database: database || this.config.database,
      defaultAccessMode: neo4j.session.WRITE,
    });
  }

  read(cypher: string, params: Record<string, any>, database?: string): Result {
    const session = this.getReadSession(database);
    return session.run(cypher, params);
  }

  write(
    cypher: string,
    params: Record<string, any>,
    database?: string,
  ): Result {
    const session = this.getReadSession(database);
    return session.run(cypher, params);
  }
}
