import { Repository, Model } from "../interfaces";
import { MongoClient, Collection, Db } from "mongodb";


const MongoRepositoryFactory = <T>(collection: string, model: Model<T>) =>
    (db: Db): Repository<T> => {

        async function getAll(query: any = {}): Promise<Array<T>> {
            const result = await getCollection().find(query).toArray()
            return result.map(formatItem)
        }

        async function add(item: T): Promise<void> {
            const key = model.key(item)
            if (key) await getCollection().updateOne(key, item, { upsert: true })
            else await getCollection().insert(item)
        }

        function getCollection(): Collection {
            return db.collection(collection)
        }

        function formatItem(item): T {
            return model.create(item)
        }

        return {
            getAll,
            add
        }

    }

export default MongoRepositoryFactory