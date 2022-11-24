const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    prenom: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type : String
    },
    confirmed: {
        type: Boolean,
        default: false
    }

},{
    timestamps : true
})

const user = mongoose.model('user', User)

module.exports = user