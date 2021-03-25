const express = require('express')
const PostController = require('../controllers/PostController')

const post = express.Router()

post.get('/posts', PostController.showposts)

post.get('/posts/add', PostController.showpostsAdd)
post.post('/posts/add', PostController.postsAdd)

post.get('/posts/:id/edit', PostController.showpostsEdit)
post.post('/posts/:id/edit', PostController.postsEdit)

post.get('/posts/:id/delete', PostController.postsDelete)

post.get('/posts/:id/addTag', PostController.showAddTag)
post.post('/posts/:id/addTag', PostController.addTag)





module.exports = post