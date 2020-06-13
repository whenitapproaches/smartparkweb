const express = require('express')
const router = express.Router()
const {getAllCars, postCar, deleteCar, patchCar, postEnterCar, postLeaveCar} = require('./carsController')
const auth = require('../auth/middleware')

router.route('/api/car')
.get(getAllCars)
.post(postCar)
.delete(deleteCar)
.patch(patchCar)

router.post('/api/car/enter', postEnterCar)
router.post('/api/car/leave', postLeaveCar)


module.exports = router