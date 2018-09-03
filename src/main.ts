import * as repoFactory from './repositories/in-memory'
import appFactory from './app';
import cliFactory from './cli'
import * as repl from './cli/repl'


const app = appFactory({
    statusRepo: repoFactory(),
    relationshipRepo: repoFactory()
})

const cli = cliFactory(app)

repl.attach(cli.execute)


