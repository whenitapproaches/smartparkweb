const Joi = require('@hapi/joi')

const CarSchema = Joi.object({
    owner: Joi.string().min(5).max(30).required(),
    plate: Joi.string().min(7).max(9).alphanum().required(),
    membership: Joi.string().valid('basic', 'premium').required()
})

export default CarSchema