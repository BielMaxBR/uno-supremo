const client = require('../redis-client.js')
const notifier = require('../notificador.js')

const updateAllCards = require('./updateAllCards.js')
const changeTurn = require('./changeTurn.js')

module.exports = async (roomName) => {
    console.log('initGame [', roomName,"]")
    client.hget('Rooms', roomName, async (err, data) =>{
        let sala = JSON.parse(data)
        sala.Playing = true
        
        function timer(seg) {
            if (seg < 1) {
                // enviar as cartas
                updateAllCards(roomName)
                // iniciar o primeiro turno
                changeTurn(roomName)
            } 
            else if (seg >= 1) {
                notifier(roomName, "initGame", seg)
                setTimeout(timer, 1000, seg-1)
            }  
        }

        timer(3)

        client.hset('Rooms', roomName, JSON.stringify(sala))
    })
} 