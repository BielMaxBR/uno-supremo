const bodyParser = require('body-parser');
const socketIo = require('socket.io')
const express = require('express')
const path = require('path')
const http = require('http')
const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const socketController = require('./socketController.js')

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'front')))

io.sockets.on('connection', socketController)

module.exports = server