const History = require("./history")

module.exports = {
    async createHistory(data) {
        await History.create(data)
    },
    listAllHistories() {
        return new Promise((resolve, reject) => {
            History.find()
            .then(histories => resolve(histories))
            .catch(err => reject(err))
        })
    }
}
