import { Module } from '@nestjs/common';
import { MongoService } from './services/mongo/mongo.service';
import { Neo4jService } from './services/neo4j/neo4j.service';

@Module({
	providers: [MongoService, Neo4jService],
	exports: [MongoService, Neo4jService],
})
export class DatabaseModule {}
