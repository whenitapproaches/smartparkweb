const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CarSchema = Schema({
    plate: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    membership: {
        type: String,
        required: true
    },
    slot: {
        type: String
    },
    enteredAt: {
        type: Date
    },
    leftAt: {
        type: Date
    }
})

const Car = mongoose.model("Car", CarSchema)

module.exports = Car