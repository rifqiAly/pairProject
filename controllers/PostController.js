const Helpers = require('../helpers/Helpers')
const {User, Tag, Post, TagPost} = require('../models')
require('dotenv').config()

class PostController{

  static readPost(par){
    return Post.findAll(par)
  }

  static findOne(id){
    return Post.findOne({ where: { id: id } })
  }

  static showposts(req,res){
    PostController.readPost({include: [{
      model: User,
      attributes: ["id","username",'first_name']
      }]
    })
      .then(a =>{
        return User.findOne({ where: { id: req.params.userid } })
        .then(user=>{
          console.log(a)
          res.render('pages/posts',{
            data: a,
            user,
            Helpers
          })
        })
      })
      .catch(err =>{
        res.send(err)
      })
  } 

  static showpostsAdd(req,res){
    return User.findOne({ where: { id: req.params.userid } })
      .then(user=>{
      res.render('pages/addPost',{
        user
      })
      })
  }

  static postsAdd(req,res){
    Post.create({
      namePost: req.body.namePost,
      rating: req.body.rating,
      content: req.body.content,
      imgURL: req.body.imgURL,
      UserId: req.params.userid
    })
      .then(()=>{
        res.redirect(`/users/${req.params.userid}/posts`)
      })
      .catch(err =>{
        let result = []
        err.errors.forEach(el => {
            result.push(el.message)
        })
        res.send(result)
      })
  }
  

  static showpostsEdit(req,res){
    Post.findOne({ where: { id: +req.params.id }, include: User })
    .then(a=>{
      let user = {
        id: +req.params.userid
      }
      res.render('pages/editPost',{data: a,
      user})
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static postsEdit(req,res){
    Post.update({
      namePost: req.body.namePost,
      rating: req.body.rating,
      content: req.body.content,
    },{
      where:{
        id: req.params.id 
      }
    })
      .then(()=>{
          res.redirect(`/users/${req.params.userid}/posts`)
        })
      .catch((err)=>{
        if(err){
          let result = []
          err.errors.forEach(el => {
              result.push(el.message)
          })
          res.send(result)
        }
      }) 
  }

  static postsDelete(req,res){
    Post.destroy({ where: {id: req.params.id}})
      .then(()=>{
        res.redirect(`/users/${req.params.userid}/posts`)
      })
      .catch((err)=>{
        res.send(err)
      })
  }

  

  static showAddTag(req,res){
    Post.findOne({ 
      where: { 
        id: +req.params.id 
      }
    })
      .then(a =>{
        return Tag.findAll()
      .then(s =>{
        return TagPost.findAll({ where: { PostId: +req.params.id }})
      .then(d =>{
        let user={
          id: +req.params.userid
        }
        res.render('pages/addTagInPost',{
          post:a,
          tag: s,
          tagpost: d,
          user
          })
      })
      })
      })
      .catch(err =>{
        res.send(err)
      })
  }

  static addTag(req,res){
    TagPost.create({
      PostId: req.params.id,
      TagId: req.body.TagId,
    })
    .then(()=>{
      return User.findOne({where: { id : req.params.userid }})
    .then(user =>{
      return Tag.findOne({where: {id: req.body.TagId}})
    .then(tag=>{
      return Post.findOne({where: {id:req.params.id}})
    .then(post=>{
      let email = user.email
      let tagged = tag.nameTag
      let posted = post.namePost
      
      Helpers.sendNotif(email,tagged,posted)
      res.redirect(`/users/${req.params.userid}/posts`)
    })
    })
    })
    })
    .catch(err =>{
      res.send(err)
    })
  }
}

module.exports = PostController
