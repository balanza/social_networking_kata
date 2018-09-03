module.exports = (input = '') => {

    const pattern = /^\s*([A-Za-z0-0\-\_]+)\s*->\s*(.+)\n*$/gi;

    const parsed = pattern.exec(input)
    if (parsed && parsed.length) {
        const person = parsed[1],
            message = parsed[2]

        return (app) => app.post(person, message)

    } else {
        return
    }


}