const {User} = require('../models')

const isLogin = (req,res,next)=>{
  
  if(req.session.loginStat == true && req.params.userid == req.session.idUser){
    
      next()
  }
  else{
      
      res.redirect('/')
  }
}

module.exports = isLogin 