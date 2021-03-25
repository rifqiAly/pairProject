const nodemailer = require('nodemailer')
require('dotenv').config()
class Helper{

  static sendNotif(email,tag,post){
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    })
    
    let mailOptions = {
      from: 'tagshareit@gmail.com',
      to: email, //via table User
      subject:'YOUR POST IS TAGGED! ',
      text: `You put ${tag} in ${post} ` //via table User & Tag
    }
    
    transporter.sendMail(mailOptions, (err,data)=>{
      if(err){
        console.log(err)
      }else{
        console.log("email is sent! check it out!")
      }
    })
  }

}

module.exports = Helper