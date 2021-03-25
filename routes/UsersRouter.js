"use strict"
const express = require('express')
const router = express.Router()
const isLogin = require('../middleware/isLogin')
const Controller = require('../controllers/userController.js')


router.get('/users/:id', isLogin, Controller.beranda)

module.exports = router