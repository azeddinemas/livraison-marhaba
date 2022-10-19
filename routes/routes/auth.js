const Router = require('express').Router()
const res = require('express/lib/response');
const user = require('../../controller/user')
const test = require('../middelwares/token-verification')


Router.post('/register', user.register);

Router.post('/login', user.auth);
Router.post('/test', test.verif(["abada"]), (req, res) => {
    res.send('sdqat')
});



module.exports = Router