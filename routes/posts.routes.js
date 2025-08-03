const express = require('express')
const router = express.Router()

const postsControllers = require('../controllers/posts.controllers')
const auth = require('../middlewares/auth')

router.post('/', auth, postsControllers.createPost)
router.get('/:id', auth, postsControllers.getPostById)
router.get('/', auth, postsControllers.getPosts)

module.exports = router