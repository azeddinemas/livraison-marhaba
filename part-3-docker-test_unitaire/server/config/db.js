const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const db = mongoose.connect(process.env.DB_CONNECT).then(() => {
    console.log('db connect')
}).catch(() => { console.log('not connected') })

module.exports = db