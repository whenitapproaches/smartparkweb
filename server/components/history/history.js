const mongoose = require("mongoose")
const config = require("config")
const price = config.get("settings.price")

const Schema = mongoose.Schema

const HistorySchema = Schema({
  plate: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  membership: {
    type: String,
    required: true,
  },
  slot: {
    type: String,
  },
  enteredAt: {
    type: Date,
  },
  leftAt: {
    type: Date,
  },
  price: {
    type: Number,
  },
  time: {
    type: String,
  },
})

function calculateTime(enterTime, leaveTime) {
  let enter = new Date(enterTime)
  let leave = new Date(leaveTime)
  let time = leave.getTime() - enter.getTime()
  let toSeconds = Math.floor(time / 1000)
  let toMinutes = Math.floor(toSeconds / 60)
  let toHours = Math.floor(toMinutes / 60)
  let remainMinutes = toMinutes - toHours * 60
  return `${toHours}h ${remainMinutes}m`
}

function calculatePrice(enterTime, leaveTime, membership) {
    let enter = new Date(enterTime)
    let leave = new Date(leaveTime)
    let time = leave.getTime() - enter.getTime()
    let toSeconds = Math.floor(time / 1000)
    let toMinutes = Math.floor(toSeconds / 60)
    return price[membership]*toMinutes
  }

HistorySchema.pre("save", function (next) {
  if (this.isNew) {
      this.time = calculateTime(this.enteredAt, this.leftAt)
      this.price = calculatePrice(this.enteredAt, this.leftAt, this.membership)
  }
  next()
})

const History = mongoose.model("History", HistorySchema)

module.exports = History
