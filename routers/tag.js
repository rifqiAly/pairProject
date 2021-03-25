const express = require('express')
const TagController = require('../controllers/TagController')

const tag = express.Router()

tag.get('/tags', TagController.showtags)

tag.get('/tags/add', TagController.showtagsAdd)
tag.post('/tags/add', TagController.tagsAdd)



tag.get('/tags/:id/delete', TagController.tagDelete)

tag.get('/tags/:id/seePosts', TagController.seeTags)



module.exports = tag
