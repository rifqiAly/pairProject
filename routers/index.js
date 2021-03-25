const express = require('express')
const router = express.Router()
const user = require('./user')
const post = require('./post')
const tag = require('./tag')




router.get('/', (req,res)=>{
  res.render('pages/main')
})
router.use(user)
router.use(post)
router.use(tag)




module.exports = router