"use strict"
const {User} = require('../models')
const {Op} = require('sequelize')
const  errorHandler = require('../helpers/handle-errors')
const bcrypt = require('bcryptjs');

class Controller{
    
    static loginHome(req,res){
        res.render('login')
    }
    static register(req, res){
        res.render('register',{
            msg: ''
        })
    }
    
    static postRegister(req, res){
        User.findOne({where:{
            username: req.body.username
        }})
            .then(val=>{
                if(val.username == req.body.username){
                    let msg= 'username has been taken'
                    res.render('register',{
                        msg
                    })
                }
            })
            .catch(err =>{
                let obj = {
                    username : req.body.username,
                    password : req.body.password,
                    first_name : req.body.first_name,
                    last_name : req.body.last_name,
                    gender : req.body.gender,
                    email : req.body.email
                }
                User.create(obj)
                .then(()=>{
                    res.render('successLogin')
                })
                .catch(err=>{
                    res.send(errorHandler.errorHandler(err))
                })
            })
    }
    
    static postLogin(req,res){   
        if(req.body.password == ''){
            res.redirect('/')
        }     
        User.findOne({
            where :{
                [Op.and]: [
                    {
                        username: {
                            [Op.eq]: req.body.username
                        }
                    },
                    {
                        password: {
                            [Op.not]: '',            // IS NOT ''
                      }
                    }
                ]
            }
        })
        .then(data=>{
            let salt = bcrypt.genSaltSync(10)
            let hash = bcrypt.hashSync(data.password, salt)
            if(bcrypt.compareSync(data.password,hash)){
                req.session.idUser = data.id
                req.session.loginStat = true
                res.redirect(`/users/${req.session.idUser}`)
            }else{
               res.redirect('/')
            }
        })
        .catch(err=>{
            res.redirect('/')
        })

    }

    static failed(req,res){
        res.render("failedLogin")
    } 

    static logout(req,res){
        req.session.destroy()
        res.redirect('/')
    }
}

module.exports = Controller 