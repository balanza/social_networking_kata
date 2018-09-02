const Joi = require('joi');

const schema = Joi.object().keys({
    author: Joi.string().alphanum().required(),
    message: Joi.string().required(),
    time: Joi.date().required()
})

function create(author, message, timestamp = new Date().getTime()) {
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

function isValid(raw) {
    return !validate(raw).error
}

function validate(raw) {
    return Joi.validate(raw, schema)
}

module.exports = {
    create,
    validate,
    isValid
}