const express = require('express')
const router = express.Router()

const usersControllers = require('../controllers/users.controllers')

router.post('/register', usersControllers.registerUser)
router.post('/login', usersControllers.loginUser)
router.post('/logout', usersControllers.logoutUser)

module.exports = router