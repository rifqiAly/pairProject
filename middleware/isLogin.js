const isLogin = (req,res,next)=>{
  if(req.session.loginStat == true){
      console.log(req.session);
      next()
  }
  else{
      console.log(req.session);
      res.redirect('/')
  }
}

module.exports = isLogin 