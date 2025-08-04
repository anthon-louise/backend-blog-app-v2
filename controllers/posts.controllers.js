const pool = require('../config/db')
const asyncHandler = require('express-async-handler')
const validationSchema = require('../validation/schema')
const { valid } = require('joi')

const createPost = asyncHandler(async (req, res) => {
    const {userId} = req.user
    const value = await validationSchema.bodySchema.validateAsync(req.body)
    const {title, content} = value

    await pool.query(`
        INSERT INTO posts (title, content, user_id)
        VALUES (?, ?, ?)
        `, [title, content, userId])
    
    res.json({message: 'Successfully created'})
})

const getPosts = asyncHandler(async (req, res) => {
    const {userId} = req.user
    const [rows] = await pool.query(`
        SELECT * FROM posts WHERE user_id=?
        `, [userId])
    
    res.json(rows)
})

const getPostById = asyncHandler(async (req, res) => {
    const {userId} = req.user
    const value = await validationSchema.idSchema.validateAsync(req.params)
    const postId = value.id

    const [rows] = await pool.query(`
        SELECT * FROM posts WHERE id=? AND user_id=?
        `, [postId, userId])
    if (rows.length === 0) {
        const err = new Error('Post not found')
        err.status = 404
        throw err
    }

    res.json(rows)
})

const deletePost = asyncHandler(async (req, res) => {
    const {userId} = req.user
    const value = await validationSchema.idSchema.validateAsync(req.params)
    const postId = value.id

    console.log(userId)
    console.log(postId)

    const [rows] = await pool.query(`
        SELECT * FROM posts WHERE id=? AND user_id=?
        `, [postId, userId])
    if (rows.length === 0) {
        const err = new Error('Post not found')
        err.status = 404
        throw err
    }

    await pool.query(`
        DELETE FROM posts WHERE id=? AND user_id=?
        `, [postId, userId])

    res.json({message: 'Deleted successfully'})
})

const updatePost = asyncHandler(async (req, res) => {
    const {userId} = req.user
    const bodyValue = await validationSchema.bodySchema.validateAsync(req.body)
    const {title, content} = bodyValue
    const idValue = await validationSchema.idSchema.validateAsync(req.params)
    const postId = idValue.id

    const [rows] = await pool.query(`
        SELECT * FROM posts WHERE id=? AND user_id=?
        `, [postId, userId])
    if (rows.length === 0) {
        const err = new Error('Post not found')
        err.status = 404
        throw err
    }

    await pool.query(`
        UPDATE posts
        SET title=?, content=?
        WHERE id=? AND user_id=?
        `, [title, content, postId, userId])

    res.json({message: 'Updated successfully'})
})

module.exports = {
    createPost,
    getPosts,
    getPostById,
    deletePost,
    updatePost
}