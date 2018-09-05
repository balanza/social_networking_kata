import * as Joi from "joi";
import { Status, Model } from '../interfaces';

const schema = Joi.object().keys({
    author: Joi.string().alphanum().required(),
    message: Joi.string().required(),
    time: Joi.date().required()
})

function create(raw): Status {
    const item = {
        author: raw.author,
        message: raw.message,
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

function key(item: Status) {
    return undefined
}

const StatusModel: Model<Status> = {
    create,
    key
}

export default StatusModel
