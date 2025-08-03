const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const validationSchema = require('../validation/schema')
const pool = require('../config/db.js')

const registerUser = asyncHandler(async (req, res) => {
    const value = await validationSchema.userSchema.validateAsync(req.body)
    const {username, password} = value

    const [rows] = await pool.query(`
        SELECT * FROM users WHERE username=?
        `, [username])
    if (rows.length > 0) {
        const err = new Error('User already exists')
        err.status = 409
        throw err
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const [result] = await pool.query(`
        INSERT INTO users (username, password)
        VALUES (?, ?)
        `, [username, hashedPassword])
    
    res.json({message: 'Successfully registered'})
})

const loginUser = asyncHandler(async (req, res) => {
    const value = await validationSchema.userSchema.validateAsync(req.body)
    const {username, password} = value

    const [rows] = await pool.query(`
        SELECT * FROM users WHERE username=?
        `, [username])
    if (rows.length === 0) {
        const err = new Error('User not found')
        err.status = 404
        throw err
    }

    const isValid = await bcrypt.compare(password, rows[0].password)
    if (!isValid) {
        const err = new Error('Password not valid')
        err.status = 400
        throw err
    }

    const token = jwt.sign(
        {userId: rows[0].id},
        process.env.SECRET,
        {expiresIn: '1h'}
    )

    res.cookie("token", token, {
        secure: false,
        httpOnly: true,
        maxAge: 3600000,
    })

    res.json({message: 'Login success'})
})

const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie()
    res.json({message: 'Successfully logout'})
})

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}