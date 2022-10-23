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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role',
        required: true
    }

})

const user = mongoose.model('user', User)

module.exports = user