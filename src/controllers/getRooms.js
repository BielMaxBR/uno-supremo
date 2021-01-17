const fs = require('fs')
const prefix = '[GET] '

module.exports = function() {
    var salas = {}
    fs.exists('./src/salas.json', async function(exists){
        if (exists) {
            fs.readFile('./src/salas.json', async function readFile(err, data){
                if (err){
                    console.log(prefix+err);
                } else {
                    salas = JSON.parse(data);
                    console.log(prefix+Object.keys(salas))
                }});
            }
        })
    return Object.keys(salas)
}