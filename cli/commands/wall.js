module.exports = (input = '') => {

    const pattern = /^\s*([A-Za-z0-0\-\_]+)\s+wall\s*\n*$/gi;

    const parsed = pattern.exec(input)
    if (parsed && parsed.length) {
        const person = parsed[1]

        return (app) => app.wall(person).then(formatResults)

    } else {
        return
    }


}


function formatResults(results){
    return results.map(formatResult)
}

function formatResult(result){
    return `${result.author} - ${result.message} (${result.time.getTime()})`
}