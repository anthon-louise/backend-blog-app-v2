const asyncHandler = require('express-async-handler')
const pool = require('../config/db')
const validationSchema = require('../validation/schema')

const createComment = asyncHandler(async (req, res) => {
    const { userId } = req.user
    const bodyValue = await validationSchema.commentSchema.validateAsync(req.body)
    const { content } = bodyValue
    const idValue = await validationSchema.idSchema.validateAsync(req.params)
    const postId = idValue.id

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

    res.json({ message: 'Commented' })
})

const getComments = asyncHandler(async (req, res) => {
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

    const [commentRows] = await pool.query(`
        SELECT * FROM comments WHERE post_id=?
        `, postId)
    res.json(commentRows)
})

const getCommentById = asyncHandler(async (req, res) => {
    const value = await validationSchema.idSchema.validateAsync(req.params)
    const commentId = value.id

    const [rows] = await pool.query(`
        SELECT * FROM comments WHERE id=?
        `, commentId)
    if (rows.length === 0) {
        const err = new Error('No comment found')
        err.status = 404
        throw err
    }

    res.json(rows)
})

module.exports = {
    createComment,
    getComments,
    getCommentById
}