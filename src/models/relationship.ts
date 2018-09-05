import * as Joi from "joi";
import { Relationship, Model } from '../interfaces';

const schema = Joi.object().keys({
    following: Joi.string().alphanum().required(),
    followed: Joi.string().alphanum().required(),
    time: Joi.date().required()
})

function create(raw): Relationship {
    const item = {
        followed: raw.followed,
        following: raw.following,
        time: raw.time || new Date()
    }
    const {
        error
    } = validate(item)
    if (error) throw `Error creating Relationship: ${error}`
    else return item
}

function isValid(raw: object): boolean {
    return !validate(raw).error
}

function validate(raw: object) {
    return Joi.validate(raw, schema)
}

function key(item: Relationship) {
    const { followed, following } = item
    return { followed, following }
}


const RelationshipModel: Model<Relationship> = {
    create,
    key
}

export default RelationshipModel