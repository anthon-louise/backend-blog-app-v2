const express = require('express')
const router = express.Router()

const postsControllers = require('../controllers/posts.controllers')
const auth = require('../middlewares/auth')

router.post('/', auth, postsControllers.createPost)
router.get('/:id', auth, postsControllers.getPostById)
router.get('/', auth, postsControllers.getPosts)
router.delete('/:id', auth, postsControllers.deletePost)
router.put('/:id', auth, postsControllers.updatePost)

module.exports = router