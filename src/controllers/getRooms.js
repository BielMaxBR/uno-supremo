const fs = require('fs')
const prefix = '[GET] '

module.exports = (callback) => {
    var salas = {}
    fs.exists('./src/salas.json', async function(exists){
        if (exists) {
            let data = fs.readFileSync('./src/salas.json', 'utf-8')

            salas = JSON.parse(data);
            
            callback(salas)
            if (Object.keys(salas).length > 0) {
                console.log(prefix+Object.keys(salas))
            }
        
            
        }
        
    })
}