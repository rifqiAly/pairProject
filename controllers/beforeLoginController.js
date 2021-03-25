"use strict"
const {User} = require('../models')
const {Op} = require('sequelize')
const Helper = require('../helpers/handle-errors')
const bcrypt = require('bcryptjs');

class Controller{

    static loginHome(req,res){
        res.render('login')
    }
    static register(req, res){
        res.render('register')
    }

    static postRegister(req, res){
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
            res.send(Helper.errorHandler(err))
        })
    }

    static postLogin(req,res){
        User.findAll({
            where :{
                [Op.and]: [
                    {
                      username: {
                        [Op.eq]: req.body.username
                      }
                    },
                    {
                      password: {
                        [Op.eq]: req.body.password
                      }
                    }
                ]
            }
        })
        .then(data=>{
            req.session.idUser = data[0].id
            res.redirect(`/users/${req.session.idUser}`)
        })
        .catch(err=>{
            res.send(err)
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