const User = require('../models/user')
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
                    User.create({...body, role: 'client'}).then(() => {
                        res.status(200).send('created success')
                    }).catch(() => { res.status(401).send('not created') })
                }else return res.status(401).send('not hashed')
            })
        } else { return res.status(401).send("this email already exist") }
    })
}


const login = (req, res) => {
    const { body } = req;
    User.findOne({ email: body.email }).then((data) => {
        if (data) {
            if (data.confirmed == true) {
                bcrypt.compare(body.password, data.password).then((elemen) => {
                    if (elemen) {
                        const token = jwt.sign({ data }, process.env.SECRET)
                        return res.send('login success')
                    } else return res.status(401).send('password incorrect')
                })
            }else return res.status(401).send('your email not confirmed')
        } else return res.status(401).send('email incorrect')
    }).catch((error)=>{
        return res.status(401).send(error)
    })
}

const reset = (req, res) => {
    const { body } = req;
    User.findOne({ email: body.email }).then((data) => {
            bcrypt.compare(body.password, data.password).then((e) => {
                if (e) {
                    bcrypt.hash(body.newPassword, 10).then((newpass) => {
                        User.updateOne({ email: body.email }, { password: newpass }).then(() => {
                            res.send('update password success')
                        })
                    })
                } else res.status(401).send('password incorrect')
            })
    }).catch(()=>{
        res.status(401).send('email not found')
    })
}


const addLivreur = (req, res) => {
    const { body } = req;
    User.findOne({ email: body.email }).then((data) => {
        if (!data) {
            ls('email', body.email)
            bcrypt.hash(body.password, 10).then((e) => {
                if (e) {
                    body.password = e
                    User.create({...body, role: 'livreur'}).then(() => {
                        res.send('created success')
                    }).catch((err) => { res.status(401).send('not created') })
                }else res.status(401).send('not hashed')
            })
        } else { res.status(401).send("this email already exist") }
    })
}


module.exports = { register, login, reset,addLivreur}