const express = require('express')
const router = require('./routers/index.js')
const app = express()
const port = 3000
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(router)


app.listen(port, () =>{
  console.log('this app is running on:', port)
})