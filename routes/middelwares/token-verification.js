const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const ls = require('local-storage')


function verif(access) {

    return (req, res, next) => {
        if (ls('token')) {
            const verif = jwt.verify(ls('token'), process.env.SECRET)
            if (verif) {
                req.payload = verif
                if (access.includes(req.payload.payload.name)) {
                    next()
                } else {
                    res.send('access denied')
                }
            } else {
                res.send('token not valid')
            }
        } else { res.send('not authent') }
    }
}

module.exports = { verif }