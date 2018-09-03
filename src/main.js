const repoFactory = require('./repositories/in-memory')
const appFactory = require('./app')
const cliFactory = require('./cli')

const app = appFactory({
    statusRepo: repoFactory(),
    relationshipRepo: repoFactory()
})

const cli = cliFactory({app})

const repl = require('./cli/repl')

repl.attach(cli.execute)


