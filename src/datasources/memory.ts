import { MongoClient } from 'mongodb'
import * as MongoInMemory from 'mongo-in-memory'

export default (config) => {
    async function getConnection() {
        const {
            port,
            name
        } = config
        const uri = await startServer({ port, name })
        MongoClient.connect(uri, { useNewUrlParser: true });
    }

    return { getConnection }

}

async function startServer({
    port,
    name
}) {
    return new Promise((resolve, reject) => {
        const mongoServerInstance = new MongoInMemory(port);
        mongoServerInstance.start((error, config) => {
            if (error) reject(error)
            else resolve(mongoServerInstance.getMongouri(name))
        });
    })
}