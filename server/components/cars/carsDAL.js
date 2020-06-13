const Car = require("./car")
const { updateGoogleSheets } = require("../services/googletSheetApiService")

module.exports = {
  listAllCars() {
    return new Promise((resolve, reject) => {
      Car.find()
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
  },
  createCar(data) {
    return new Promise((resolve, reject) => {
      Car.create(data)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
  },
  async updateSheetSlots() {
    Car.find().where("slot").ne(null).select('owner plate membership enteredAt slot')
    .exec((err, docs) => {
        if(err) return console.log(err)
        let arr = docs.reduce((acc, cur) => {
            let field = [
                cur.slot, cur.owner, cur.plate, cur.membership, cur.enteredAt
            ]
            return [...acc, field]
        }, [])
        updateGoogleSheets(arr)
    })
  },
}
