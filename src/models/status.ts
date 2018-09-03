import * as Joi from "joi";
import { Status } from '../interfaces';

const schema = Joi.object().keys({
    author: Joi.string().alphanum().required(),
    message: Joi.string().required(),
    time: Joi.date().required()
})

function create(author: string, message: string, timestamp = new Date().getTime()): Status {
    const raw = {
        author,
        message,
        time: new Date(timestamp)
    }
    const {
        error
    } = validate(raw)
    if (error) throw `Error creating Status: ${error}`
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