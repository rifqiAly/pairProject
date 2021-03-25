"use strict"
const express = require('express')
const session = require('express-session')
const app = express()
const PORT = 3000
const UsersRoutes = require('./routes/UsersRouter')
const beforeLoginController = require('./controllers/beforeLoginController')

app.set('view engine', 'ejs')
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "TagShare"
}))
app.use(express.urlencoded({extended: true}))

app.get('/', beforeLoginController.loginHome)
app.post('/', beforeLoginController.postLogin)
app.get('/register', beforeLoginController.register)
app.post('/register', beforeLoginController.postRegister)
app.use(UsersRoutes)

app.listen(PORT, () => {
    console.log('server on PORT ', PORT);
})