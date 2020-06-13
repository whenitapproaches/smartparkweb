const {listAllHistories} = require('../history/historyDAL')
const History = require('./history')

module.exports = {
    getAllHistories: function(req, res, next) {
        listAllHistories()
        .then(cars => res.json(cars))
        .catch(err => console.log(err))
    },
}