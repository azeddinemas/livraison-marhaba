const express = require('express')
const app = express()
const authRoute = require('./routes/routes/auth')
const db = require('./config/db')



app.use(express.json())
    // app.use(express.urlencoded({ extended: true }))
app.use('/api/auth', authRoute);



app.listen(3000, console.log("port is 3000"))