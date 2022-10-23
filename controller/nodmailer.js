const nodemailer = require("nodemailer");
const ls = require('local-storage')
const jwt = require('jsonwebtoken');
const user = require('../models/user')


const main = () => {
    const email = ls('email')
    const emt = jwt.sign({ email }, process.env.SECRET)
    const link = "http://localhost:3000/api/auth/confirmation/" + emt
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'maslouhazeddine@gmail.com',
            pass: 'mzxzsukrytpijqvn',
        },
    });


    let info = {
        from: '"azeddine" <maslouhazeddine@gmail.com>',
        to: ls('email'),
        subject: "email verification ✔",
        html: '<b>Hello we just got a request to create an account with this email, please verify in this link <a href=' + link + '>confirm it</a></b>',
    };
    transporter.sendMail(info)
}

function conform(req, res) {
    const { token } = req.params
    const eml = jwt.verify(token, process.env.SECRET)
    req.email = eml
    user.findOneAndUpdate({ email: req.email.email }, { confirmed: true }).then((req, res) => {
        console.log('confirmed')
    }).catch((req, res) => {
        console.log('not confirmed')
    })
}

// function confirm(req,res){
//   const tkn=jwt.verify(req.params.email_token,process.env.SECRET)
//   req.email=tkn
//   User.findOneAndUpdate({email:req.email.email},{confirmation:true}).then(()=>{
//     res.render('errorview',{data:{
//         msg:"comfirmed!!",
//         statu:'confirmation',
//         class:'bg-success'
//     }})
//   })

// }
module.exports = { main, conform }