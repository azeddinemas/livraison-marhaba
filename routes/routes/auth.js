const Router = require('express').Router()
const user = require('../../controller/user')


Router.post('/register', user.register)

Router.post('/login', user.auth)



module.exports = Router