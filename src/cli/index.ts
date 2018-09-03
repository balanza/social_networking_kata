import { App } from '../interfaces'
import * as postCommand from './commands/post';
import * as readCommand from './commands/read';
import * as followCommand from './commands/follow';
import * as wallCommand from './commands/wall';

export type Action = (App) => Promise<any>
export type InvalidAction = void
export type Command = (string) => Action | InvalidAction


const implementedCommands: Array<Command> = [
    postCommand,
    readCommand,
    followCommand,
    wallCommand
]

export default (app: App) => {

    required('app', app)
    isApp('app', app)


    async function execute(input: string) {
        if (!input) throw 'command is required'
        const action = createExecutableAction(input)
        if (!action || typeof action !== 'function') throw `no matching action for command ${input}`
        const r = await action(app)
        return r
    }

    const trace = e => {
        console.log(e)
        return e
    }
    function createExecutableAction(input) {
        const matchingActions = implementedCommands
            .map(command => command(input))
            .filter(action => typeof action === 'function')
        return matchingActions[0]
    }

    return {
        execute
    }
}


function required(label, target) {
    if (!target) throw `${label} is required;`;
}

function isApp(label, target) {
    const test = e => e && typeof e === 'object'
    if (!test(target)) throw `${label} is not a valid app;`;
}