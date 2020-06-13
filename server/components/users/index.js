const express = require('express')
const router = express.Router()
const {getAllUsers, postUser, postLogin} = require('./usersController')

router.route('/user')
.post(postUser)

router.route('/user/login')
.post(postLogin)

module.exports = router