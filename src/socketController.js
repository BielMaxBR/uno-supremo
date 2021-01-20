const fs = require('fs')
const createRoom = require('./controllers/createRoom.js')
const getRooms = require('./controllers/getRooms.js')
const addUser = require('./controllers/addUser.js')

var TotalPlayers = []
module.exports = async function(socket) {
    console.log('#################')
    console.log('Socket conectado')
    TotalPlayers.push(socket)
    createRoom('sala')
    fs.watch('./src/salas.json', (event, nome) => {
    if (nome) {
        if (event == 'change') {
            try {
                console.log('wew!')
                getRooms(async salas => {
                    await socket.emit('updateRooms', [Object.keys(salas)])
                    await socket.broadcast.emit('updateRooms', [Object.keys(salas)])
                    console.log('wow!', salas)
                })
            }
            catch(err) {
                console.log(err)
            }
        }
    }

    });

    await socket.on('createRoom', createRoom)
    await socket.on('addUser', (username, sala)=>{ addUser(username, sala, socket); console.log('addUser\n') })
    await socket.on('disconnect', ()=>{ 
        // disconnectPlayer
        
    })
}