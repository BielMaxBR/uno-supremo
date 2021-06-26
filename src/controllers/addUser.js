/*if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}*/

const client = require('../redis-client.js')
const notifier = require('../notificador.js')
const removeUser = require('./removeUser.js')

module.exports = async (username, salaNome, socket) => {
    client.hget('Rooms', salaNome, async (err, data) => {
        if (username.trim().length == 0) {
            console.log(123)
            notifier(socket.id, "error", "insira um nome de usuário");
            return
        }

        if (salaNome == socket.room) { notifier(socket.id, "error", "você já está nessa sala"); console.log('já foi'); return }

        if (socket.room.length != 0) {
            removeUser(socket)
            notifier(socket.id, 'leaveRoom', socket.room)
        }
        if (!err) {
            let sala = {}
            if (data) {
                sala = data
            }


            let ConfigSala = JSON.parse(sala)
            console.log(ConfigSala.Players)
            if (ConfigSala.Players[username.trim()]) { notifier(socket.id, "error", "esse nome já existe nessa sala"); return }

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

            client.hset('Rooms', salaNome, JSON.stringify(ConfigSala))
            notifier(socket.room, 'addUser', socket, username)

            notifier(socket.id, 'enterRoom', socket.room)

            const users = Object.keys(ConfigSala.TotalUsers)
            console.log('dps ', users)
            await socket.to(socket.room).emit('updateUsers', users)
            await socket.emit('updateUsers', users)

        }
        else {
            console.log(err)
        }
    })
}