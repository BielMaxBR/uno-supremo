const client = require('../redis-client.js')
const notifier = require('../notificador.js')

module.exports = () => {
    client.hget('Rooms', roomName, async (err, data) =>{
        if (err) {console.error(err);return}
        let sala = JSON.parse(data)
        
        sala.Turn += sala.Direction

        client.hset('Rooms', roomName, JSON.stringify(sala))
    })
}