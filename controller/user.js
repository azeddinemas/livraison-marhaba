const User = require('../models/user')
const bcrypt = require('bcryptjs');


const register = (req, res) => {
    const { body } = req;
    User.findOne({ email: body.email }).then((e) => {
        if (!e) {
            bcrypt.hash(body.password, 10)
                .then((e) => {
                    body.password = e
                    User.create({...body })
                        .then(() => { res.json({ body }) })
                        .catch((e) => { res.json({ msg: 'not created' + e }) })
                }).catch((error) => { res.json({ msg: 'not creat' + '' + error }) })
        } else { res.send('email deja kain') }
    })
}

const auth = (req, res) => {

}


module.exports = { register, auth }