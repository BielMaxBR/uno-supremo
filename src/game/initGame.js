const client = require('../redis-client.js')
const io = require('../socketIO')
const notifier = require('../notificador.js')

module.exports = async (data) => {
    client.hget('Rooms', data, async () =>{
        let sala = JSON.parse(data)
        sala.Playing = true
        notifier(io,sala, "initGame")
    })
}