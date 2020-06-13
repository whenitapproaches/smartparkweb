const {listAllCars, createCar, updateSheetSlots} = require('./carsDAL')
const CarValidator = require('./carsValidator')
const {createHistory} = require('../history/historyDAL')
const Car = require('./car')
module.exports = {
    getAllCars: function(req, res, next) {
        listAllCars()
        .then(cars => res.json(cars))
        .catch(err => console.log(err))
    },
    postCar: async function(req, res, next) {
        let validation = CarValidator.validate(req.body)
        if(validation.error) return res.status(400).send(validation.error.details[0].message)
        let car = await Car.findOne({
            plate: req.body.plate
        })
        if(car) return res.status(400).send("This car numberplate has already been registered")
        car = await createCar(req.body)
        return res.status(200).json(car)
    },
    deleteCar: async function(req, res, next) {
        let car = await Car.findOne({
            _id: req.body._id
        })
        if(!car) return res.status(400).send("No car found")
        await Car.deleteOne({
            _id: req.body._id
        })
        updateSheetSlots()
        return res.status(200).send("OK")
    }, 
    patchCar: async function(req, res, next) {
        let car = await Car.findOne({
            _id: req.body._id
        })
        if(!car) return res.status(400).send("No car found")
        await Car.updateOne({
            _id: req.body._id
        }, req.body)
        updateSheetSlots()
        return res.status(200).json(req.body)
    },
    postEnterCar: async function(req, res, next) {
        let car = await Car.findOne({
            _id: req.body._id
        })
        if(!car) return res.status(400).send("No car found")
        if(!req.body.slot) return res.status(400).send("Please choose a slot")
        car = await Car.exists({
            slot: req.body.slot
        })
        if(car) return res.status(400).send("This slot has been taken")
        car = await Car.updateOne({
            _id: req.body._id
        }, {
            slot: req.body.slot,
            enteredAt: Date.now()
        })
        car = await Car.findOne({
            _id: req.body._id
        })
        updateSheetSlots()
        return res.status(200).json(car)
    },
    postLeaveCar: async function(req, res, next) {
        let car = await Car.findOne({
            _id: req.body._id
        })
        if(!car) return res.status(400).send("No car found")
        if(!car.slot) return res.status(400).send("This car hasn't parked yet")
        let slot = car.slot
        car = await Car.updateOne({
            _id: req.body._id
        }, {
            slot: null,
            leftAt: Date.now()
        })
        car = await Car.findOne({
            _id: req.body._id
        })
        updateSheetSlots()
        createHistory({
            plate: car.plate,
            owner: car.owner,
            membership: car.membership,
            enteredAt: car.enteredAt,
            leftAt: car.leftAt,
            slot: slot
        })
        return res.status(200).json(car)
    }
}