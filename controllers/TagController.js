const {User, Tag, Post, TagPost} = require('../models')


class TagController{

  static readTag(par){
    return Tag.findAll(par)
  }

  static showtags(req,res){
    TagController.readTag()
      .then(a =>{
        let user={
          id: req.params.userid
        }
        res.render('pages/tags',{
          data:a,
          user
        })
      })
  }
  
  static showtagsAdd(req,res){
    let user={
      id: req.params.userid
    }
    res.render('pages/addTag',{
      user
    })
  }

  

  static tagsAdd(req,res){
    Tag.create({
      nameTag: req.body.nameTag
    })
      .then(()=>{
        res.redirect(`/users/${req.params.userid}/tags`)
      })
      .catch(err =>{
        res.send(err)
      })
  }

  static showtagEdit(req,res){
    Tag.findOne({ where: { id: +req.params.id }})
    .then(a=>{
      let user={
        id: req.params.userid
      }
      res.render('pages/editTag',{data: a, user})
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static tagDelete(req,res){
    Tag.destroy({ where: {id: req.params.id}})
      .then(()=>{
        res.redirect(`/users/${req.params.userid}/tags`)
      })
      .catch((err)=>{
        res.send(err)
      })
  }

  static seeTags(req,res){
    Tag.findOne({
      where: {
        id: +req.params.id 
      },
      include: [{
        model: Post,
      }]
    })
      .then(a =>{
        console.log(a.posts)
        let user={
          id: req.params.userid
        }
        res.render('pages/seePostsInTag', {
          tag: a,
          user
        })
      })
      .catch(err =>[
        res.send(err)
      ])
  }

}

module.exports = TagController