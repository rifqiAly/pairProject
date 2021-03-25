const {User} = require('../models')

class UserController{
  static beranda(req,res){
    res.send("welcome")
  }

  static readUsers(par){
    return User.findAll(par)
  }

  static showUsers(req,res){
    let userid = req.params.userid
    UserController.readUsers()
      .then(users =>{
        return User.findOne({where:{id: userid}})
        .then(user =>{
        res.render('pages/users',{
          users,
          user
      })
      })
    })
    .catch(err =>{
      res.send(err)
    })
  }
}

module.exports = UserController