const express = require('express')
const PostController = require('../controllers/PostController')
const isLogin = require('../middleware/isLogin')


const post = express.Router()

post.get('/users/:userid/posts', isLogin, PostController.showposts)

post.get('/users/:userid/posts/add', isLogin, PostController.showpostsAdd)
post.post('/users/:userid/posts/add', isLogin, PostController.postsAdd)

post.get('/users/:userid/posts/:id/edit', isLogin, PostController.showpostsEdit)
post.post('/users/:userid/posts/:id/edit', isLogin, PostController.postsEdit)

post.get('/users/:userid/posts/:id/delete', isLogin, PostController.postsDelete)

post.get('/users/:userid/posts/:id/addTag', isLogin, PostController.showAddTag)
post.post('/users/:userid/posts/:id/addTag', isLogin, PostController.addTag)





module.exports = post