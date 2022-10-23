const mongoose = require('mongoose')

const Role = new mongoose.Schema({
    role: {
        type: String
    }
})

const role = mongoose.model('role', Role)

module.exports = role