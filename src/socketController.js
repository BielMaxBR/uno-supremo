const createRoom = require('./controllers/createRoom.js')
const getRooms = require('./controllers/getRooms.js')
const fs = require('fs')

module.exports = async function(socket) {
    console.log('#################')
    console.log('Socket conectado')
    await socket.on('createRoom', createRoom)
    // Example when handled through fs.watch() listener
    fs.watch('./src/salas.json',  async (event, nome) => {
    if (nome) {
        if (event == 'change') {
            var salas = await getRooms()
            await socket.broadcast.emit('updateRooms', salas)
            console.log('[CONTROL] '+salas)
        }
    }
    });
}