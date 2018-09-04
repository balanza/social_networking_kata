import { Status, Repository } from "../interfaces";
import { MongoClient, Collection, Db } from "mongodb";

const COLLECTION = 'statuses'

const MongoStatusRepositoryFactory = (db: Db): Repository<Status> => {

    async function getAll(query: any = {}): Promise<Array<Status>> {
        const result = await getCollection().find(query).toArray()
        return result.map(formatItem)
    }

    async function add(item: Status): Promise<void> {
        const result = await db.collection(COLLECTION).insertOne(item)
        return
    }

    function getCollection(): Collection {
        return db.collection(COLLECTION)
    }

    function formatItem(item): Status {
        const { author, message, time } = item
        return { author, message, time }
    }

    return {
        getAll,
        add
    }

}

export default MongoStatusRepositoryFactory