const express = require('express')
const UserController = require('../controllers/UserController')
const user = express.Router()

user.get('/users', UserController.showUsers)


module.exports = user