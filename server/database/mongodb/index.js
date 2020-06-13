const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')

mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)

mongoose.connect(config.get("connection.database.mongodb"))
.then(res => console.log(chalk.green('Database connected.')))
.catch(err => console.log(chalk.red("There was an error connecting to database!")))

module.exports = mongoose