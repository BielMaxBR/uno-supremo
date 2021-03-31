const client = require('../redis-client.js')
const updateCards = require('./updateCards.js')

module.exports = (roomName) => {
    client.hget('Rooms', roomName, async (err, data) =>{
        if (err) {console.error(err);return}
        
        let sala = JSON.parse(data)
        for( let player in sala.Players) {
            updateCards(roomName, player, 'add', 7)
        }
    })
}