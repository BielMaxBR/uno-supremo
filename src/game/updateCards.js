const client = require('../redis-client.js')
const io = require('../socketIO')

function random_item(items) {
    return items[Math.floor(Math.random()*items.length)]; 
}

module.exports = (player, event, ...args) => {
    client.hget('Rooms', roomName, async (err, data) =>{
        if (err) {console.error(err);return}

        let sala = JSON.parse(data)
        switch(event) {
            case "add":
                for (let i = 0; i < args[0]; i++) {
                    let carta = random_item(sala.baralho)
                    sala.baralho.splice(sala.baralho.indexOf(carta), 1)
                    
                    sala.playerCards[player].push(carta)
                }
                break;
        
            case "remove":
                break;
        
            case "swap":
                break;
        
        }

        client.hset('Rooms', roomName, JSON.stringify(sala))
        io.to(player).emit('updateCards', sala.playerCards[player])
    })
}