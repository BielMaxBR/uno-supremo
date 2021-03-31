const client = require('../redis-client.js')
const initGame = require('./initGame.js')

module.exports = async (socket) => {
    client.hget('Rooms', socket.room, (err,data) =>{
        if (err) {console.error(err);return}
        let sala = JSON.parse(data)

        sala.Ready[socket.username] = true
        
        client.hset('Rooms',socket.room, JSON.stringify(sala))

        let isReady = true
        if (Object.entries(sala.Ready).length <= 1) {
            isReady = false
        }
        for ( const [key, value] of Object.entries(sala.Ready)) {
            console.log(key, value)
            if (!value) {
                isReady = false
                console.log('não tá pronto')
                break
            } 
        }

        if (isReady) {
            initGame(socket.room)
        }
    })
}