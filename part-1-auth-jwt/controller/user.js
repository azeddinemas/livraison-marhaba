const User = require('../models/user')
const role = require('../models/role')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const ls = require('local-storage')
const dotenv = require('dotenv');
const mailer = require('./nodmailer')


const register = (req, res) => {
    const { body } = req;
    User.findOne({ email: body.email }).then((data) => {
        if (!data) {
            ls('email', body.email)
            mailer.main()
            bcrypt.hash(body.password, 10).then((e) => {
                if (e) {
                    body.password = e
                    User.create({...body }).then(() => {
                        res.send(body)
                    }).catch((err) => { res.send('not created' + '' + err) })
                }
            })
        } else { res.send('email deja kain') }
    })
}


const auth = (req, res) => {
    const { body } = req;
    User.findOne({ email: body.email }).then((data) => {
        if (data) {
            bcrypt.compare(body.password, data.password).then((elemen) => {
                if (elemen) {
                    const token = jwt.sign({ data }, process.env.SECRET)
                    res.json({ msg: token })
                } else res.send('password incorrect')
            })
        } else res.send('name incorrect')
    })
}

const reset = (req, res) => {
    const { body } = req;
    User.findOne({ email: body.email }).then((data) => {
        if (data) {
            bcrypt.compare(body.password, data.password).then((e) => {
                if (e) {
                    bcrypt.hash(body.newpassword, 10).then((newpass) => {
                        User.updateOne({ email: body.email }, { password: newpass }).then(() => {
                            res.send('update password success')
                        })
                    })
                } else res.send('password incorrect')
            })
        } else res.send('email not found')
    })
}




module.exports = { register, auth, reset }