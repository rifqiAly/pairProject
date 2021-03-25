const express = require('express')
const TagController = require('../controllers/TagController')
const isLogin = require('../middleware/isLogin')


const tag = express.Router()


tag.get('/users/:userid/tags', isLogin, TagController.showtags)

tag.get('/users/:userid/tags/add', isLogin, TagController.showtagsAdd)
tag.post('/users/:userid/tags/add', isLogin, TagController.tagsAdd)



tag.get('/users/:userid/tags/:id/delete', isLogin, TagController.tagDelete)

tag.get('/users/:userid/tags/:id/seePosts', isLogin, TagController.seeTags)



module.exports = tag
