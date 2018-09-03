const Joi = require('joi');

const schema = Joi.object().keys({
    following: Joi.string().alphanum().required(),
    followed: Joi.string().alphanum().required(),
    time: Joi.date().required()
})

function create(following, followed, timestamp = new Date().getTime()) {
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