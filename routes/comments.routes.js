const express = require('express')
const router = express.Router()
const commentsControllers = require('../controllers/comments.controllers')
const auth = require('../middlewares/auth')

router.post('/:id', auth, commentsControllers.createComment)
router.get('/:id', auth, commentsControllers.getComments)
router.get('/single/:id', auth, commentsControllers.getCommentById)
router.delete('/:id', auth, commentsControllers.deleteComment)
router.put('/:id', auth, commentsControllers.updateComment)

module.exports = router