const socketIo = require('socket.io')
    , server = require('./app.js')
    , io = socketIo(server)

module.exports = io