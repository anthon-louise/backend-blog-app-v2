const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const likesControllers = require('../controllers/likes.controllers')

router.post('/:id', auth, likesControllers.likePost)
router.delete('/:id', auth, likesControllers.unlikePost)

module.exports = router