const fs = require('fs')
const prefix = '[CREATE] '
const Sala = require('../Classes/RoomClass.js')

module.exports = function(nome) {
    var obj = {}
    console.log(prefix+nome)
    fs.exists('./src/salas.json', async function(exists){
        console.log(prefix+exists)
        if(exists){
            fs.readFile('./src/salas.json', function readFile(err, data){
                if (err){
                    console.log(prefix+err);
                } else {
                    obj = JSON.parse(data);
                    console.log(prefix+obj)
                    obj[nome] = new Sala()
                    var json = JSON.stringify(obj); 
                    fs.writeFileSync('./src/salas.json', json);
                    console.log(prefix+json)
                    return obj
                }});
        } 
        else {
            obj[nome] = {}
            var json = JSON.stringify(obj);
            fs.writeFileSync(path='./src/salas.json', json);
            console.log(prefix+json)
            return obj
        }
    });
}