const fs = require('fs')
const createRoom = require('./controllers/createRoom.js')
const getRooms = require('./controllers/getRooms.js')
const addUser = require('./controllers/addUser.js')

var TotalPlayers = []
module.exports = async function(socket) {
    console.log('#################')
    console.log('Socket conectado')
    TotalPlayers.push(socket)
    fs.watch('./src/salas.json', (event, nome) => {
    setTimeout(()=>{
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
    },100)
    });

    await getRooms(socket)
    await socket.on('createRoom', createRoom)
    await socket.on('addUser', (username, sala)=>{ addUser(username, sala, socket); console.log('addUser\n') })
    await socket.on('disconnect', ()=>{ 
        // disconnectPlayer
        
    })
}