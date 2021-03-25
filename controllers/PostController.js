const {User, Tag, Post, TagPost} = require('../models')

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
      attributes: ["id","nameuser","username"]
      }]
    })
      .then(a =>{
        res.render('pages/posts',{
          data: a
        })
      })
      .catch(err =>{
        res.send(err)
      })
  } 

  static showpostsAdd(req,res){
    res.render('pages/addPost')
  }

  static postsAdd(req,res){
    Post.create({
      namePost: req.body.namePost,
      rating: req.body.rating,
      content: req.body.content,
      UserId: 1 // THIS WILL BE CHANGED ONCE LOGIN IS CREATED
    })
      .then(()=>{
        res.redirect('/posts')
      })
      .catch(err =>{
        res.send(err)
      })
  }
  

  static showpostsEdit(req,res){
    Post.findOne({ where: { id: +req.params.id }, include: User })
    .then(a=>{
      res.render('pages/editPost',{data: a})
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
          res.redirect('/posts')
        })
      .catch((err)=>{
        if(err){
          res.send(err)
        }
      }) 
  }

  static postsDelete(req,res){
    Post.destroy({ where: {id: req.params.id}})
      .then(()=>{
        res.redirect('/posts')
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
        res.render('pages/addTagInPost',{
          post:a,
          tag: s,
          tagpost: d
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
      res.redirect('/posts')
    })
    .catch(err =>{
      res.send(err)
    })
  }
}

module.exports = PostController
