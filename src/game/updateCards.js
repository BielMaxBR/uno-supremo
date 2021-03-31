const client = require('../redis-client.js')
const io = require('../socketIO')

function random_item(items) {
    return items[Math.floor(Math.random()*items.length)]; 
}

module.exports = (roomName, player, event, ...args) => {
    client.hget('Rooms', roomName, async (err, data) =>{
        if (err) {console.error(err);return}
        if (data == undefined) {console.error("data é "+data);return}
        let sala = JSON.parse(data)
        
        switch(event) {
            case "add":
                for (let i = 0; i < args[0]; i++) {
                    let carta = random_item(sala.Baralho)
                    sala.Baralho.splice(sala.Baralho.indexOf(carta), 1)
                    
                    sala.PlayerCards[player].push(carta)
                }
                break;
        
            case "remove":
                break;
        
            case "swap":
                break;
        
        }

        client.hset('Rooms', roomName, JSON.stringify(sala))
        io.to(sala.Players[player]).emit('updateCards', sala.PlayerCards[player])
        console.log("updateCards de: "+player)
    })
}