const Router = require('express').Router()
const user = require('../../controller/user')
const test = require('../middelwares/token-verification')
const main = require('../../controller/nodmailer');


Router.post('/register', user.register);

Router.post('/login', user.login);

Router.post('/addlivreur',user.addLivreur)

Router.post('/reset', user.reset)
Router.post('/test', test.verif(["63516a1ae3ee4879bb6c51e9"]), (req, res) => {
    res.send('sdqat')
});

Router.get('/confirmation/:token', main.confirm);
Router.post('/forget',main.forgetPassword);
Router.post('/updatepassword/:token',main.updatePassword);

module.exports = Router