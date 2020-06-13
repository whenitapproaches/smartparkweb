const bcrypt = require('bcrypt')
const { SignInUserValidator, SignUpUserValidator } = require("./userValidator")
const UserError = require('./usersError')
const jwt = require('jsonwebtoken')
const config = require('config')
const salt = 10
const {findUserByUsername, createUser} = require('./usersDAL')

module.exports = {
    hashPassword: function(password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, salt, function(err, hash) {
                if(err) reject(err)
                resolve(hash)
            })
        })
    },
    signUpUser: async function(userInfo) {
        let user = await findUserByUsername(userInfo.username)
        if(user) return Promise.reject(UserError(401, "This username has already been taken"))
        let validation = SignUpUserValidator.validate(userInfo)
        if(validation.error) return Promise.reject(UserError(401, validation.error.details[0].message))
        bcrypt.hash(userInfo.password, salt, function(err, hash) {
            if(err) console.log(err)
            userInfo.password = hash
            createUser(userInfo)
        })
    },
    signInUser: async function(credentials) {
        let user = await findUserByUsername(credentials.username)
        if(!user) return Promise.reject(UserError(401, "This username doesn't exist"))
        let validation = SignInUserValidator.validate(credentials)
        if(validation.error) return Promise.reject(UserError(401, validation.error.details[0].message))
        return new Promise((resolve, reject) => {
            bcrypt.compare(credentials.password, user.password, function(err, match) {
                if(err) console.log(err)
                if(!match) return reject(UserError(401, "Wrong password"))
                let token = jwt.sign(credentials.username, config.get("authentication.privateKey"))
                return resolve(token)
            })
        })
    }
}