const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(routes)

const server = require('http').createServer(app)

module.exports = {
    server
}