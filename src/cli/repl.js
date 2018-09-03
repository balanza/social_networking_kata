const repl = require('repl')

const START_WITH = '> '

module.exports = {

    attach: (execute) => {
        const options = {
            prompt: START_WITH,
            terminal: true,
            writer: formatOutput,
            eval: async (input, context, filename, callback) => {
                try {
                    
                    const cmd = cleanInput(input)
                    const result = await execute(cmd)

                    if (empty(result)) callback(null)
                    else callback(null, result)

                } catch (ex) {
                    callback(ex)
                }
            }

        }

        repl.start(options)
    }
}

function cleanInput(input) {
    return input.replace(/\n/gi, '')
}

function empty(result) {
    return !result || !result.length
}

function formatOutput(result) {
    if (empty(result)) return ''
    else if (Array.isArray(result)) return `${START_WITH}${result.join('\n'+START_WITH)}`
    else return `${START_WITH}${result}`
}