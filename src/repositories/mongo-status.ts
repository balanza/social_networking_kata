import MongoRepositoryFactory from './mongo'
import StatusModel from '../models/status'

const COLLECTION = 'statuses'
const MongoStatusRepositoryFactory =
    MongoRepositoryFactory(
        COLLECTION,
        StatusModel
    )

export default MongoStatusRepositoryFactory