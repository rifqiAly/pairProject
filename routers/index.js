const express = require('express')
const router = express.Router()
const {User} = require('../models')
const user = require('./user')
const post = require('./post')
const tag = require('./tag')
const isLogin = require('../middleware/isLogin')

const Controller = require('../controllers/beforeLoginController')


router.get('/', Controller.loginHome)
router.post('/', Controller.postLogin)
router.get('/register', Controller.register)
router.post('/register', Controller.postRegister)
router.get('/failed', Controller.failed)
router.get('/logout', Controller.logout)


router.get('/users/:userid', isLogin, (req,res)=>{
  let userid = req.params.userid
  User.findOne({where:{id: userid}})
    .then(user=>{
      res.render('pages/main',{
        user
      })
    })
    .catch(err=>{
      res.send(err)
    })
})


router.use(user)
router.use(post)
router.use(tag)




module.exports = router