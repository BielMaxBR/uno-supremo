const fs = require('fs')
const SalaClass = require('../Classes/RoomClass.js')
const notifier = require('../notificador.js')

module.exports = async (socket)=>{
    const salaNome = socket.room
    const username = socket.username
    fs.exists('./src/salas.json', async function(exists){
        if(exists){
            fs.readFile('./src/salas.json', function readFile(err, data){
                if(!err) {
                    if (!salaNome) { return }
                    const salas = JSON.parse(data)
                    let ConfigSala = salas[socket.room]

                    if (Object.keys(ConfigSala.Players).length < ConfigSala.LimitPlayers) {
                        delete ConfigSala.Players[username]
                    }
                    else {
                        delete ConfigSala.Spectators[username]
                    }
                    delete ConfigSala.PlayerCards[username]
                    delete ConfigSala.Ready[username]

                    notifier(socket,socket.room,"removeUser", username)
                    socket.leave(socket.room)
                    console.log('[REMOVE] ',socket.username)
                    salas[salaNome] = new SalaClass(ConfigSala)
                    let json = JSON.stringify(salas)
                    fs.writeFileSync('./src/salas.json', json);
                }
                else {
                    console.log(err)
                }
            })
        }
    })
}