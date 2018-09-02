const START_WITH = '> '

module.exports = () => {

    function attach(execute) {
        const options = {
            prompt: START_WITH,
            eval = async (input, context, filename, callback) => {
                const cmd = cleanInput(cmd)

                try {
                    const result = await execute(cmd)
                    const output = formatOutput(result)
                    callback(null, output)
                } catch (ex) {
                    callback(ex)
                }
            }

        }

        repl.start(options)
    }

    return {
        attach
    }
}

function cleanInput(input) {
    return input.replace(/\n/gi, '')
}

function formatOutput(result) {
    return `${START_WITH}${result}`
}