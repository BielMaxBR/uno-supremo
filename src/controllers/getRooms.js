const client = require('../redis-client.js')
const prefix = '[GET] '

module.exports = (callback) => {
    var salas = {}
    client.hgetall('Rooms', async (err,data)=>{
        if (!err) {
            if (data) {
                salas = data
            }
            callback(salas)

            if (Object.keys(salas).length > 0) {
                console.log(prefix+Object.keys(salas))
            }
        
        }
        
    })
}