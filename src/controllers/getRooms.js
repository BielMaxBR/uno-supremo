const fs = require('fs')
const prefix = '[GET] '
module.exports = async ()=>{
    var salas = {}
    fs.exists('./src/salas.json', function(exists){
        if (exists) {
            fs.readFile('./src/salas.json', function readFile(err, data){
                if (err){
                    console.log(prefix+err);
                } else {
                    salas = JSON.parse(data);
                    console.log(prefix+Object.keys(salas))
            }});
            return Object.keys(salas)
        }
    })
}