if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}

const fs = require('fs')
const SalaClass = require('../Classes/RoomClass.js')
const notifier = require('../notificador.js')
const removeUser = require('./removeUser.js')
const getRooms = require('./getRooms.js')

module.exports = async (username, salaNome, socket)=>{
    fs.exists('./src/salas.json', async function(exists){
        if(exists){
            fs.readFile('./src/salas.json', async function readFile(err, data){
                if (username.trim() == '') { notifier(socket,socket.id,"error","insira um nome de usuário"); return }
                
                if (salaNome == socket.room) { notifier(socket,socket.id,"error","você já está nessa sala"); console.log('já foi'); return }
                
                if (socket.room != '') {
                    removeUser(socket)
                    notifier(socket,socket.room,"removeUser", socket.username)
                    notifier(socket,socket.room,"leaveRoom")
                }
                if(!err) {
                    const salas = JSON.parse(data)
                    let ConfigSala = salas[salaNome.toString()]
                    if (ConfigSala.Players[username.trim()]) { notifier(socket,socket.id,"error","esse nome já existe nessa sala"); return }

                    if (Object.keys(ConfigSala.Players).length < ConfigSala.LimitPlayers) {
                        ConfigSala.Players[username] = socket.id
                    }
                    else {
                        ConfigSala.Spectators[username] = socket.id
                    }
                    ConfigSala.PlayerCards[username] = []
                    ConfigSala.Ready[username] = false
                    ConfigSala.TotalUsers[username] = socket.id
                    socket.username = username
                    socket.room = salaNome

                    socket.join(socket.room)

                    salas[salaNome] = new SalaClass(ConfigSala)
                    let json = JSON.stringify(salas)

                    fs.writeFileSync('./src/salas.json', json);
                    notifier(socket,socket.room,'addUser', username)
                    notifier(socket,socket.room,'enterRoom')

                    const users = Object.keys(ConfigSala.TotalUsers)
                    console.log('dps ',users)
                    await socket.to(socket.room).emit('updateUsers', users)
                    await socket.emit('updateUsers', users)

                }
                else {
                    console.log(err)
                }
            })
        }
    })
}