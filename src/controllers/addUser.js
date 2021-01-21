const fs = require('fs')
const SalaClass = require('../Classes/RoomClass.js')

module.exports = async (username, salaNome, socket)=>{
    fs.exists('./src/salas.json', async function(exists){
        if(exists){
            fs.readFile('./src/salas.json', function readFile(err, data){
                if(!err) {
                    const salas = JSON.parse(data)
                    let ConfigSala = salas[salaNome.toString()]

                    if (Object.keys(ConfigSala.Players).length < ConfigSala.LimitPlayers) {
                        ConfigSala.Players[username] = socket.id
                    }
                    else {
                        ConfigSala.Spectators[username] = socket.id
                    }
                    ConfigSala.PlayerCards[username] = []
                    ConfigSala.Ready[username] = false

                    socket.username = username
                    socket.room = salaNome

                    socket.join(socket.room)

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