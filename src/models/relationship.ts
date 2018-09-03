import * as Joi from "joi";
import { Relationship } from '../interfaces';

const schema = Joi.object().keys({
    following: Joi.string().alphanum().required(),
    followed: Joi.string().alphanum().required(),
    time: Joi.date().required()
})

function create(following: string, followed: string, timestamp = new Date().getTime()): Relationship {
    const raw = {
        following,
        followed,
        time: new Date(timestamp)
    }
    const {
        error
    } = validate(raw)
    if (error) throw `Error creating Relationship: ${error}`
    else return raw
}

function isValid(raw: object): boolean {
    return !validate(raw).error
}

function validate(raw: object) {
    return Joi.validate(raw, schema)
}

export {
    create,
    validate,
    isValid
}