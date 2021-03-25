const isLogin = (req,res,next)=>{
  if(Number(req.params.userid) === req.session.idUser){
      console.log(req.params.userid);
      console.log(req.session);
      next()
  }
  else{
      console.log(req.session);
      res.redirect('/')
  }
}

module.exports = isLogin 