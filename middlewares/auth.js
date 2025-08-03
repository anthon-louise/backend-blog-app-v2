const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        const err = new Error('No token')
        err.status = 401
        throw err
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.SECRET
        )
        req.user = decoded
        next()
    } catch (err) {
        return res.status(403).json({message: 'Invalid token'})
    }
}