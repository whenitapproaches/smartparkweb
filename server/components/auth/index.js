const express = require('express')
const router = express.Router()

const middleware = require('./middleware')

router.route('/auth')
.post(middleware, (req, res, next) => {
    return res.status(200).send("OK")
})


module.exports = router