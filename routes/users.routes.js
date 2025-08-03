const express = require('express')
const router = express.Router()

const usersControllers = require('../controllers/users.controllers')

router.post('/register', usersControllers.registerUser)

module.exports = router