const mongoose = require('mongoose')
const { required } = require('nodemon/lib/config')

const User = new mongoose.Schema({
    name: {
        type: String
    },
    prenom: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    image: {
        type: String
    },
    role: {
        type: String
    },
    password: {
        type: String
    }
})
const user = mongoose.model('user', User)

module.exports = user