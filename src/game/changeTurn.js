const client = require('../redis-client.js')
const io = require('../socketIO')
const notifier = require('../notificador.js')

module.exports = (roomName) => {
    client.hget('Rooms', roomName, async (err, data) =>{
        if (err) {console.error(err);return}

        let sala = JSON.parse(data)

        sala.Turn += sala.Direction
        let players = sala.Players
        io.to(Object.values(players)[sala.Turn]).emit('turn', 'é seu turno')
        notifier(Object.values(players)[sala.Turn], 'yourTurn')
        notifier(roomName, 'turnIs', io.sockets.sockets.get(Object.values(players)[sala.Turn]), Object.keys(players)[sala.Turn])
        client.hset('Rooms', roomName, JSON.stringify(sala))
    })
}