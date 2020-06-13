const express = require('express')
const router = express.Router()
const {getAllHistories} = require('./historyController')
const auth = require('../auth/middleware')

router.route('/api/histories')
.get(getAllHistories)

module.exports = router