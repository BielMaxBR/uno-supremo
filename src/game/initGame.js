const client = require('../redis-client.js')
const io = require('../socketIO')
const notifier = require('../notificador.js')

module.exports = async (name) => {
    console.log('initGame [', name,"]")
    client.hget('Rooms', name, async (err, data) =>{
        let sala = JSON.parse(data)
        sala.Playing = true
        client.hset('Rooms', name, JSON.stringify(sala))
        notifier(name, "initGame")
    })
}