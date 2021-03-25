const express = require('express')
const UserController = require('../controllers/UserController')
const user = express.Router()
const isLogin = require('../middleware/isLogin')


user.get('/users/:userid/users', isLogin, UserController.showUsers)


module.exports = user