const nodemailer = require("nodemailer");
const ls = require('local-storage')
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs')


let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'maslouhazeddine@gmail.com',
        pass: 'mzxzsukrytpijqvn',
    },
});



const main = () => {
    const email = ls('email')
    const emt = jwt.sign({ email }, process.env.SECRET)
    const link = "http://localhost:7000/api/auth/confirmation/" + emt

    let info = {
        from: '"azeddine" <maslouhazeddine@gmail.com>',
        to: ls('email'),
        subject: "email verification ✔",
        html: '<b>Hello we just got a request to create an account with this email, please verify in this link <a href=' + link + '>confirm it</a></b>',
    };
    transporter.sendMail(info)
}

function confirm(req, res) {
    const token = req.params.token
    const eml = jwt.verify(token, process.env.SECRET)
    User.findOneAndUpdate({ email: eml.email }, { confirmed: true }).then(() => {
        ls('ver','email verifie success')
        res.redirect('http://localhost:3000/login/:azerty')
    }).catch(() => {
        console.log('not confirmed')
    })
}


const forgetPassword = (req, res) => {
    User.findOne({email : req.body.email}).then((e)=>{
        if (e) {
            const email = req.body.email 
            const emt = jwt.sign({email}, process.env.SECRET)
            const link = "http://localhost:7000/api/auth/updatepassword/" + emt
            let info = {
                from: '"azeddine" <maslouhazeddine@gmail.com>',
                to: req.body.email,
                subject: "Réinitialisation de mot de passe pour votre compte Marhaba",
                html: '<p>pour réinitialiser votre mot de passe de votre compte Marhaba</p><a href='+link+'></a>></form>',
            };
            const send = transporter.sendMail(info)
            if (send) {
                res.send('visite your email')
            }
        }else  res.status(401).send('email not found')
    }).catch((error)=>{
        res.status(401).send(error)
    })
}

const updatePassword = (req,res)=>{
    const token = req.params.token
    const vrToken = jwt.verify(token,process.env.SECRET) 
    bcrypt.hash(req.body.password,10).then((pass)=>{
        User.updateOne({_id : vrToken._id},{password : pass}).then(()=>{
            res.send('forget success')
            // res.redirect('http://localhost:3000/login')
        })
    }).catch(()=>{
        res.status(401).send('not forget')
    })
}

module.exports = { main, confirm,forgetPassword,updatePassword }