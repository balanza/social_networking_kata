import * as mongodb from 'mongo-mock'

export default (config) => {

    async function getConnection() {
        return new Promise((resolve, reject) => {
            const {
                host,
                port,
                name
            } = config
            const MongoClient = mongodb.MongoClient
            MongoClient.connect(
                `mongodb://localhost:27017/snk`,
                (err, db) => {
                    if(err) reject(err)
                    else resolve(db)
                }
            );

        })

    }

    return { getConnection }

}