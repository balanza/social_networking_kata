import MongoRepositoryFactory from './mongo'
import RelationshipModel from '../models/relationship'

const COLLECTION = 'relationships'
const MongoRelationshipRepositoryFactory =
    MongoRepositoryFactory(
        COLLECTION,
        RelationshipModel
    )

export default MongoRelationshipRepositoryFactory