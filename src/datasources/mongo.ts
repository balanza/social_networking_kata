import { MongoClient } from 'mongodb'

export default (config) => {

    async function getConnection() {
        const {
            host,
            port,
            name
        } = config
        const client = await MongoClient.connect(`mongodb://${host}:${port}`, { useNewUrlParser: true });
        return client.db(name)
    }

    return { getConnection }

}