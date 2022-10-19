const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const ls = require('local-storage')
const dotenv = require('dotenv');


// const register = (req, res) => {
//     const { body } = req;
//     User.findOne({ email: body.email }).then((e) => {
//         if (!e) {
//             bcrypt.hash(body.password, 10)
//                 .then((e) => {
//                     body.password = e
//                     User.create({...body })
//                         .then(() => { res.json({ body }) })
//                         .catch((e) => { res.json({ msg: 'not created' + e }) })
//                 }).catch((error) => { res.json({ msg: 'not creat' + '' + error }) })
//         } else { res.send('email deja kain') }
//     })
// }

// const auth = (req, res) => {
//     const { body } = req;
//     User.findOne({ email: body.email }).then((e) => {
//         if (e) {
//             const payload = e
//             bcrypt.compare(body.password, e.password).then((e) => {
//                 if (e) {
//                     const token = jwt.sign({ payload }, process.env.SECRET)
//                     ls('token', token)
//                     res.send('hello page')

//                 } else { res.send('password ralat') }
//             })
//         } else { res.send('email not found') }
//     })
// }

const register = (req, res) => {
    const { body } = req;
    User.findOne({ email: body.email }).then((e) => {
        if (!e) {
            bcrypt.hash(body.password, 10).then((e) => {
                body.password = e
                User.create({...body }).then(() => {
                    res.send('created')
                })
            })
        } else { res.send('bdl email') }
    })
}




const auth = (req, res) => {
    const { body } = req;
    User.findOne({ email: body.email }).then((e) => {
        if (e) {
            const payload = e;
            bcrypt.compare(body.password, e.password)
                .then((e) => {
                    if (e) {
                        const token = jwt.sign({ payload }, process.env.SECRET)
                        ls('token', token)
                        res.send('hello page')
                    } else { res.send('password ralat') }
                })
        } else { res.send('email ralat') }
    })
}









module.exports = { register, auth }