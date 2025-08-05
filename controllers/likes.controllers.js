const pool = require('../config/db')
const validationSchema = require('../validation/schema')
const asyncHandler = require('express-async-handler')

const likePost = asyncHandler(async (req, res) => {
    const { userId } = req.user
    const value = await validationSchema.idSchema.validateAsync(req.params)
    const postId = value.id


    const [postRows] = await pool.query(`
        SELECT * FROM posts WHERE id=?
        `, [postId])
    if (postRows.length === 0) {
        const err = new Error('Post not found')
        err.status = 404
        throw err
    }

    const [likeRows] = await pool.query(`
        SELECT * FROM likes WHERE post_id=? AND user_id=?
        `, [postId, userId])
    if (likeRows.length > 0) {
        const err = new Error('Already liked')
        err.status = 409
        throw err
    }

    await pool.query(`
        INSERT INTO likes (post_id, user_id)
        VALUES (?, ?)
        `, [postId, userId])

    res.json({ message: 'Liked' })
})

const unlikePost = asyncHandler(async (req, res) => {
    const { userId } = req.user
    const value = await validationSchema.idSchema.validateAsync(req.params)
    const postId = value.id

    const [rows] = await pool.query(`
        SELECT * FROM likes WHERE post_id=? AND user_id=?
        `, [postId, userId])
    if (rows.length === 0) {
        const err = new Error('Not liked already')
        err.status = 400
        throw err
    }

    await pool.query(`
        DELETE FROM likes
        WHERE post_id=? AND user_id=?
        `, [postId, userId])

    res.json({ message: 'Unliked' })
})

module.exports = {
    likePost,
    unlikePost
}