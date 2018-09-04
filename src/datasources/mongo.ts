import { MongoClient } from 'mongodb'

export default (config) => {

    async function getConnection() {
        const {
            host,
            port,
            name
        } = config
        MongoClient.connect(`mongodb://${host}:${port}/${name}`, { useNewUrlParser: true });
    }

    return { getConnection }

}