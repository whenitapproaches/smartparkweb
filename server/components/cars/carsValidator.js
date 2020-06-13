const Joi = require("@hapi/joi")

const CarValidator = Joi.object({
    plate: Joi.string().min(7).max(9).alphanum().required(),
    owner: Joi.string().min(5).max(30).required(),
    membership: Joi.string().valid('basic', 'premium', 'guest').required(),
    slot: Joi.string().optional(''),
    enteredAt: Joi.date().optional(''),
    leftAt: Joi.date().optional('')
})

module.exports = 
    CarValidator
