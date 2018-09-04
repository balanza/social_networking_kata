const inMemory = !process.env.DB_HOST

const db = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || 'snk'
}

module.exports = {
    inMemory,
    db
}