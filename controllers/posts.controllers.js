const pool = require('../config/db')
const asyncHandler = require('express-async-handler')
const validationSchema = require('../validation/schema')

const createPost = asyncHandler(async (req, res) => {
    const {userId} = req.user
    const value = await validationSchema.bodySchema.validateAsync(req.body)
    const {title, content} = value

    const [result] = await pool.query(`
        INSERT INTO posts (title, content, user_id)
        VALUES (?, ?, ?)
        `, [title, content, userId])
    
    res.json({message: 'Successfully created'})
})

module.exports = {
    createPost
}