const {User} = require('../models')

class UserController{
  static readUsers(par){
    return User.findAll(par)
  }

  static showUsers(req,res){
    UserController.readUsers()
      .then(users =>{
        res.render('pages/users',{
          users
      })
    })
    .catch(err =>{
      res.send(err)
    })
  }
}

module.exports = UserController