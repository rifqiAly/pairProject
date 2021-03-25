const {User, Tag, Post, TagPost} = require('../models')


class TagController{

  static readTag(par){
    return Tag.findAll(par)
  }

  static showtags(req,res){
    TagController.readTag()
      .then(a =>{
        res.render('pages/tags',{
          data:a
        })
      })
  }
  
  static showtagsAdd(req,res){
    res.render('pages/addTag')
  }

  

  static tagsAdd(req,res){
    Tag.create({
      nameTag: req.body.nameTag
    })
      .then(()=>{
        res.redirect('/tags')
      })
      .catch(err =>{
        res.send(err)
      })
  }

  static showtagEdit(req,res){
    Tag.findOne({ where: { id: +req.params.id }})
    .then(a=>{
      console.log(a)
      res.render('pages/editTag',{data: a})
    })
    .catch(err=>{
      res.send(err)
    })
  }

  static tagDelete(req,res){
    Tag.destroy({ where: {id: req.params.id}})
      .then(()=>{
        res.redirect('/tags')
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
        // attributes: ["id","namePost","Rating"]
      }]
    })
      .then(a =>{
        console.log(a)
        res.render('pages/seePostsInTag', {
          tag: a,
        })
      })
      .catch(err =>[
        res.send(err)
      ])
  }

}

module.exports = TagController