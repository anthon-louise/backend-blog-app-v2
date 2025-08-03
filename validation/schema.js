const Joi = require('joi')

const userSchema = Joi.object({
    username: Joi.string().min(3).max(24).required(),
    password: Joi.string().min(3).max(50).required()
})

module.exports = {
    userSchema
}