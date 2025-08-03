const express = require('express')
const router = express.Router()

const usersControllers = require('../controllers/users.controllers')

router.post('/register', usersControllers.registerUser)
router.post('/login', usersControllers.loginUser)

module.exports = router