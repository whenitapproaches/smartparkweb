const User = require("./user")

module.exports = {
  listAllUsers() {
    return new Promise((resolve, reject) => {
      User.find()
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
  },
  createUser(data) {
    User.create(data)
  },
  async findUserByUsername(username) {
    return await User.findOne({
        username: username
    })
  }
}
