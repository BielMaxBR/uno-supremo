const fs = require('fs')
const prefix = '[GET] '

module.exports = async (socket) => {
    var salas = {}
    fs.exists('./src/salas.json', async function(exists){
        if (exists) {
            fs.readFile('./src/salas.json', async function readFile(err, data){
                if (err){
                    console.log(prefix+err);
                } 
                else {
                    salas = JSON.parse(data);
                    console.log(prefix+Object.keys(salas))
                    await socket.emit('updateRooms', Object.keys(salas))
                    await socket.broadcast.emit('updateRooms', Object.keys(salas))
                }
            });
        }
    })
}