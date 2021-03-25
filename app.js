const express = require('express')
const session = require('express-session')
const router = require('./routers/index.js')
const app = express()
const port = 3000
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "TagShare"
}))

app.use(router)
app.listen(port, () =>{
  console.log('this app is running on:', port)
})