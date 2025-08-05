const asyncHandler = require('express-async-handler')
const pool = require('../config/db')
const validationSchema = require('../validation/schema')

const createComment = asyncHandler(async (req, res) => {
    const { userId } = req.user
    const bodyValue = await  validationSchema.commentSchema.validateAsync(req.body)
    const { content } = bodyValue
    const idValue = await validationSchema.idSchema.validateAsync(req.params)
    const postId = idValue.id

    console.log(postId)

    const [rows] = await pool.query(`
        SELECT * FROM posts WHERE id=?
        `, [postId])
    if (rows.length === 0) {
        const err = new Error('Post not found')
        err.status = 404
        throw err
    }

    await pool.query(`
        INSERT INTO comments (content, post_id, user_id)
        VALUES (?, ?, ?)
        `, [content, postId, userId])

    res.json({message: 'Commented'})
})


module.exports = {
    createComment
}