import run from './runner'
import * as repl from './cli/repl'

run()
    .then(({ cli }) => repl.attach(cli.execute))
    .catch(e => { throw e })