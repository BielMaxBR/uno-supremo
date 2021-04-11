const client = require('../redis-client.js')

module.exports = async (roomName, playerId) => {
    client.hget('Rooms', roomName, (err,data) =>{
        if (err) {console.error(err);return}
        let sala = JSON.parse(data)
        // começa o bagulho aq
        
    })
}