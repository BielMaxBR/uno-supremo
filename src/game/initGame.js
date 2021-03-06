const client = require('../redis-client.js')


module.exports = async (room) => {
    client.hget('Rooms', room, async () =>{

    })
}