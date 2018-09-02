module.exports = (input = '') => {

    const pattern = /^\s*([A-Za-z0-0\-\_]+)\s+follows\s+([A-Za-z0-0\-\_]+)\s*\n*$/gi;

    const parsed = pattern.exec(input)
    if (parsed && parsed.length) {
        const following = parsed[1],
         followed = parsed[2]

        return (app) => {
            app.follow(following, followed)
        }

    } else {
        return
    }


}