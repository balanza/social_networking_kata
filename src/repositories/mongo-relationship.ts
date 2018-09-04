import { Repository, Relationship } from "../interfaces";
import { MongoClient, Collection, Db } from "mongodb";

const COLLECTION = 'relationships'

const MongoRelationshipRepositoryFactory = (db: Db): Repository<Relationship> => {

    async function getAll(query: any = {}): Promise<Array<Relationship>> {
        const result = await getCollection().find(query).toArray()
        return result.map(formatItem)
    }

    async function add(item: Relationship): Promise<void> {
        const { following, followed } = item
        const key = { following, followed }
        await db.collection(COLLECTION).updateOne(key, item, { upsert: true })
    }

    function getCollection(): Collection {
        return db.collection(COLLECTION)
    }

    function formatItem(item): Relationship {
        const { following, followed, time } = item
        return { following, followed, time }
    }

    return {
        getAll,
        add
    }

}

export default MongoRelationshipRepositoryFactory