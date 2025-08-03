const express = require('express')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middlewares/errorHandler')
const usersRoutes = require('./routes/users.routes')
const postsRoutes = require('./routes/posts.routes')

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/users', usersRoutes)
app.use('/posts', postsRoutes)

app.use(errorHandler)


module.exports = app