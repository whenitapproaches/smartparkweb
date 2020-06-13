const express = require('express')
const app = express()
const http = require('http')
const config = require('config')
const chalk = require('chalk')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const server = http.createServer()

app.use(cors({
    "origin": "http://localhost:8080",
    "allowedHeaders": "Authorization, Content-Type, Set-Cookie",
    "credentials": true
}))

app.use(cookieParser())

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

const UserRouter = require('./components/users')
app.use(UserRouter)
const CarRouter = require('./components/cars')
app.use(CarRouter)
const HistoryRouter = require('./components/history')
app.use(HistoryRouter)
const AuthRouter = require('./components/auth')
app.use(AuthRouter)

app.listen(config.get("connection.port"), config.get("connection.IP"),() => {
    console.log(chalk.green("Server is listening at", config.get("connection.port"), "..."))
})