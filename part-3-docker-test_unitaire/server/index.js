const express = require('express')
const app = express()
const authRoute = require('./routes/routes/auth')
const db = require('./config/db')
const cors = require('cors')


app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use('/api/auth', authRoute);


module.exports = app