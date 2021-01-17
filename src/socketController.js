const fs = require('fs')
const createRoom = require('./controllers/createRoom.js')
const getRooms = require('./controllers/getRooms.js')
const addUser = require('./controllers/addUser.js')

module.exports = async function(socket) {
    console.log('#################')
    console.log('Socket conectado')
    
    fs.watch('./src/salas.json', (event, nome) => {
    if (nome) {
        if (event == 'change') {
            try {
                getRooms(socket)
            }
            catch(err) {
                console.log(err)
            }
        }
    }
    });

    await getRooms(socket)
    await socket.on('createRoom', createRoom)
    await socket.in('addUser', (username, sala)=>{ addUser(username, sala, socket) })
    
}