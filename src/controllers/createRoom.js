if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}

const fs = require('fs')
const prefix = '[CREATE] '
const SalaClass = require('../Classes/RoomClass.js')
const notifier = require('../notificador.js')

module.exports = function(nome, socket) {
    var obj = {}
    fs.exists('./src/salas.json', async function(exists){
        if(exists){
            fs.readFile('./src/salas.json', function readFile(err, data){
                if (err){
                    console.log(prefix+err);
                } else {
                    obj = JSON.parse(data);
                    if (obj[nome]) { notifier(socket,socket.id,"error","essa sala já existe") } 
                    else if(nome.trim() == '') { notifier(socket,socket.id,"error","insira um nome na sala") }
                    else {
                        console.log(prefix+nome)
                        console.log(prefix+exists)
                        // console.log(prefix+obj)
                        obj[nome] = new SalaClass()
                        var json = JSON.stringify(obj); 
                        fs.writeFileSync('./src/salas.json', json);
                        // console.log(prefix+json)
                        return obj

                    } 
                }});
        } 
        else {
            obj[nome] = {}
            var json = JSON.stringify(obj);
            fs.writeFileSync(path='./src/salas.json', json);
            // console.log(prefix+json)
            return obj
        }
    });
}