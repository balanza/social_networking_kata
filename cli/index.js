const implementedCommands = [
    'post',
    'read',
    'follow',
    'wall'
]

module.exports = ({
    app
}) => {

    required('app', app)
    isApp('app', app)


    function execute(command) {
        if(!command) throw 'command is required'
        const action = createExecutableAction(command)
        if(!action || typeof action !== 'function') throw `no matching action for command ${command}`
        action(app)
    }

    function createExecutableAction(input) {
        const matchingActions = implementedCommands
            .map(commandName => require(`./commands/${commandName}`))
            .filter(command => typeof command === 'function')
            .filter(command => command(input))
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

