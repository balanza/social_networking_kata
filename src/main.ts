import * as config from './config'
import MongoDataSource from './datasources/mongo'
import MemoryDataSource from './datasources/memory'
import MongoStatusRepositoryFactory from './repositories/mongo-status'
import MongoRelationshipRepositoryFactory from './repositories/mongo-relationship'
import appFactory from './app';
import cliFactory from './cli'
import * as repl from './cli/repl'
import { Db } from 'mongodb';

const dataSource = config.inMemory ? MemoryDataSource : MongoDataSource

dataSource(config.db)
    .getConnection()
    .then((db: Db) => {
        const app = appFactory({
            statusRepo: MongoStatusRepositoryFactory(db),
            relationshipRepo: MongoRelationshipRepositoryFactory(db)
        })

        const cli = cliFactory(app)

        repl.attach(cli.execute)

    })
    .catch(e => { throw e })




