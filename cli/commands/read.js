module.exports = (input = '') => {

    const pattern = /^\s*([A-Za-z0-0\-\_]+)\s*\n*$/gi;

    const parsed = pattern.exec(input)
    if (parsed && parsed.length) {
        const person = parsed[1]

        return (app) => app.read(person)

    } else {
        return
    }


}