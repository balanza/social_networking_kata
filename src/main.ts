import * as config from './config'
import MongoDataSource from './datasources/mongo'
import MemoryDataSource from './datasources/memory'
import * as repoFactory from './repositories/in-memory'
import appFactory from './app';
import cliFactory from './cli'
import * as repl from './cli/repl'

const dataSource = config.inMemory ? MemoryDataSource : MongoDataSource

dataSource(config.db)
    .getConnection()
    .then(db => {
        const app = appFactory({
            statusRepo: repoFactory(),
            relationshipRepo: repoFactory()
        })

        const cli = cliFactory(app)

        repl.attach(cli.execute)

    })
    .catch(e => { throw e })




