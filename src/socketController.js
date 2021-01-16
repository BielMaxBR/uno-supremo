const createRoom = require('./controllers/createRoom.js')

module.exports = async function(socket) {
    console.log('#################')
    console.log('Socket conectado')
    await socket.on('createRoom', createRoom)
}