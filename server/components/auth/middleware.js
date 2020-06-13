const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    let token = req.cookies.Token
    let decode = jwt.decode(token, config.get("authentication.privateKey"))
    if(!decode) return res.status(401).send("Unauthorized")
    next()
}