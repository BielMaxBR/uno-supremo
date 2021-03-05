const client = require('../redis-client.js')
const notifier = require('../notificador.js')

module.exports = async (socket, callback)=>{
    const salaNome = socket.room
    const username = socket.username
    client.hget('Rooms', salaNome, async (err, data)=>{

        if(!err) {
            if (!salaNome) { return }

            let sala = {}
            if (data){
                sala = data
            } 
            
            let ConfigSala = JSON.parse(sala)
            if (Object.keys(ConfigSala.Players).length < ConfigSala.LimitPlayers) {
                delete ConfigSala.Players[username]
            }
            else {
                delete ConfigSala.Spectators[username]
            }
            delete ConfigSala.PlayerCards[username]
            delete ConfigSala.Ready[username]
            delete ConfigSala.TotalUsers[username]
            notifier(socket,socket.room,"removeUser", username)
            socket.leave(socket.room)
            const users = Object.keys(ConfigSala.TotalUsers)
            await socket.to(socket.room).emit('updateUsers', users)
            console.log('[REMOVE] ',socket.username)

            client.hset('Rooms',salaNome, JSON.stringify(ConfigSala))
            if (callback) { callback(ConfigSala, salaNome) }
        }
        else {
            console.log(err)
        }
            
    })
}