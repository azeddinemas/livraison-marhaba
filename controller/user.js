const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const ls = require('local-storage')
const dotenv = require('dotenv');
const mail = require('./nodmailer')


const register = (req, res) => {
    // Role.findOne({ role: "client" }).then((data) => {
    //     res.send(data)
    // })
    const { body } = req;
    User.findOne({ email: body.email }).then((data) => {
        if (!data) {
            bcrypt.hash(body.password, 10).then((e) => {
                if (e) {
                    body.password = e
                    User.create({...body }).then(() => {
                        res.send(body)
                        mail.main()
                    }).catch((err) => { res.send('not created' + '' + err) })
                }
            })
        } else { res.send('email deja kain') }
    })
}


const auth = (req, res) => {
    const { body } = req
    User.findOne({ email: body.email }).then((data) => {
        if (data) {
            bcrypt.compare(body.password, data.password)
                .then((e) => {
                    if (e) {
                        const token = jwt.sign({ data }, process.env.SECRET)
                        ls('token', token)
                        res.send(body)
                    } else { res.send('password ralat') }
                })
        } else { res.send('email ralat') }
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