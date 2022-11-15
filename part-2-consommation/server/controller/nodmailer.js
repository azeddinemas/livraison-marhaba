const nodemailer = require("nodemailer");
const ls = require('local-storage')
const jwt = require('jsonwebtoken');
const user = require('../models/user');



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
    user.findOneAndUpdate({ email: eml.email }, { confirmed: true }).then(() => {
        res.redirect('http://localhost:3000/login')
    }).catch(() => {
        console.log('not confirmed')
    })
}


const forgetPassword = async (req, res) => {
    user.findOne({email : req.body.email}).then((e)=>{
        if (e) {
            res.send('kain')
            // const emt = jwt.sign({ _id: e._id }, process.env.SECRET)
            // const link = "http://localhost:7000/api/auth/forget/" + emt
            // let transporter = nodemailer.createTransport({
            //     host: 'smtp.gmail.com',
            //     port: 465,
            //     secure: true,
            //     auth: {
            //         user: 'maslouhazeddine@gmail.com',
            //         pass: 'mzxzsukrytpijqvn',
            //     },
            // });


            // let info = {
            //     from: '"azeddine" <maslouhazeddine@gmail.com>',
            //     to: ls('email'),
            //     subject: "email verification ✔",
            //     html: '<p>cliquer sur ce <a href='+link+'>lien</a> pour réinitialiser votre mot de passe de votre compte Marhaba</p>',
            // };
            // transporter.sendMail(info)
        }else res.send('email not found')
    })
    
   
}

module.exports = { main, confirm,forgetPassword }