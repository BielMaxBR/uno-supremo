const fs = require('fs')
const createRoom = require('./controllers/createRoom.js')
const prefix = '[GET] '

function getRooms() {
    var salas = {}
    fs.exists('./src/salas.json', async function(exists){
        if (exists) {
            fs.readFile('./src/salas.json', async function readFile(err, data){
                if (err){
                    console.log(prefix+err);
                } else {
                    salas = JSON.parse(data);
                    console.log(prefix+Object.keys(salas))
                }});
            }
        })
    return Object.keys(salas)
}


module.exports = async function(socket) {
    console.log('#################')
    console.log('Socket conectado')
    await socket.on('createRoom', createRoom)
    // Example when handled through fs.watch() listener
    fs.watch('./src/salas.json', (event, nome) => {
    if (nome) {
        if (event == 'change') {
            try {
                let salas = getRooms()
                console.log(getRooms())
                socket.broadcast.emit('updateRooms', salas)
                console.log('[CONTROL] '+ salas)
            }
            catch(err) {
                console.log(err)
            }

        }
    }
    });
}