const express = require('express')
const router = express.Router()
const commentsControllers = require('../controllers/comments.controllers')
const auth = require('../middlewares/auth')

router.post('/:id', auth, commentsControllers.createComment)

module.exports = router