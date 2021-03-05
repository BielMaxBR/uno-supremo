const client = require('../redis-client.js')

module.exports = async (socket) => {
    client.hget('Rooms', socket.room, (err,data) =>{
        let sala = data

        sala.Ready[socket.username] = true
        let isReady = false
        for ( const [key, value] of Object.entries(sala.Ready)) {
            if (!value) {
                isReady = false
                return
            } 
        }

        if (isReady) {
            
        }
    })
}