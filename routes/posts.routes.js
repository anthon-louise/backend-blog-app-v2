const express = require('express')
const router = express.Router()

const postsControllers = require('../controllers/posts.controllers')
const auth = require('../middlewares/auth')

router.post('/', auth, postsControllers.createPost)

module.exports = router