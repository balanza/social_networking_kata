const {
    formatStatus,
    formatStatusList
} = require('../lib/formatter')
module.exports = (input = '') => {

    const pattern = /^\s*([A-Za-z0-0\-\_]+)\s*\n*$/gi;

    const parsed = pattern.exec(input)
    if (parsed && parsed.length) {
        const person = parsed[1]

        return (app) => app.read(person)
            .then(e => formatStatusList(e, formatStatus))

    } else {
        return
    }


}

function formatResults(results) {
    return results ? results.map(formatResult) : []
}

function formatResult(result) {
    return `${result.message} (${result.time.getTime()})`
}