const Joi = require('joi')

const userSchema = Joi.object({
    username: Joi.string().min(3).max(24).required(),
    password: Joi.string().min(3).max(50).required()
})

const bodySchema = Joi.object({
    title: Joi.string().min(3).max(20).required(),
    content: Joi.string().min(3).max(20).required()
})

const idSchema = Joi.object({
    id: Joi.number().integer().positive().required()
})

const commentSchema = Joi.object({
    content: Joi.string().min(3).max(20).required()
})

module.exports = {
    userSchema,
    bodySchema,
    idSchema,
    commentSchema
}