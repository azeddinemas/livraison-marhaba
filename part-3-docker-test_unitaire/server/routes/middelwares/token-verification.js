const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const ls = require('local-storage')


function verif(access) {

    return (req, res, next) => {
        if (ls('token')) {
            const verif = jwt.verify(ls('token'), process.env.SECRET)
            if (verif) {
                if (access.includes(verif.role)) {
                    next()
                } else {
                    res.send('you are not client')
                }
            } else {
                res.send('token not valid')
            }
        } else { res.send('not authent') }
    }
}



module.exports = { verif }