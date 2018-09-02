const repl = require('repl')

const START_WITH = '> '

module.exports = {

    attach: (execute) => {
        const options = {
            prompt: START_WITH,
            terminal: true,
            eval: async (input, context, filename, callback) => {
                const cmd = cleanInput(input)

                try {
                    const result = await execute(cmd)
                    callback(null, result)
                } catch (ex) {
                    callback(ex)
                }
            },
            writer: formatOutput

        }

        repl.start(options)
    }
}

function cleanInput(input) {
    return input.replace(/\n/gi, '')
}

function formatOutput(result) {
    if(!result || !result.length) return '' 
    else if (Array.isArray(result)) return `${START_WITH}${result.join('\n'+START_WITH)}`
    else return `${START_WITH}${result}`
}