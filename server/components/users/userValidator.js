const Joi = require("@hapi/joi")

const SignUpUserValidator = Joi.object({
  username: Joi.string().alphanum().min(5).max(30).required(),
  password: Joi.string().min(5).max(30).required()
})

const SignInUserValidator = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

module.exports = {
    SignUpUserValidator, SignInUserValidator
}