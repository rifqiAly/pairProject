const isLogin = (req,res,next)=>{
    if(Number(req.params.id) === req.session.idUser){
        console.log(req.params.id);
        console.log(req.session);
        next()
    }
    else{
        console.log(req.session);
        res.redirect('/failed')
    }
}

module.exports = isLogin