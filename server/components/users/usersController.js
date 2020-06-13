const { listAllUsers } = require("./usersDAL")
const { signUpUser, signInUser } = require("./usersService")
const config = require('config')

module.exports = {
  postUser: function (req, res, next) {
    signUpUser(req.body)
      .then((msg) => res.status(200).send("OK"))
      .catch((err) => res.status(err.status).send(err.message))
  },
  postLogin: function (req, res, next) {
    signInUser(req.body)
      .then(token => {
        res.cookie('Token', token, {
            httpOnly: true,
            maxAge: config.get("authentication.cookieTime")
        })
        res.status(200).send('OK')
      })
      .catch((err) => res.status(err.status).send(err.message))
  },
}
