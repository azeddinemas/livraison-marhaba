const express = require('express')
const app = express()
const authRoute = require('./routes/routes/auth')
const db = require('./config/db')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/auth', authRoute);

app.set('view engine', 'ejs')

app.use('/login', (req, res) => {
    res.render('login.ejs')
})
app.use('/register', (req, res) => {
    res.render('register.ejs')
})



app.listen(3000, console.log("port is 3000"))