const fs = require('fs')
module.exports = function(nome) {
    var obj = {}
    console.log(nome)
    fs.exists('./src/salas.json', async function(exists){
        console.log(exists)
        if(exists){
            fs.readFile('./src/salas.json', function readFile(err, data){
                if (err){
                    console.log(err);
                } else {
                    obj = JSON.parse(data);
                    console.log(obj)
                    obj[nome] = {}
                    var json = JSON.stringify(obj); 
                    fs.writeFileSync('./src/salas.json', json);
                    console.log(json)
                }});
        } 
        else {
            obj[nome] = {}
            var json = JSON.stringify(obj);
            fs.writeFileSync(path='./src/salas.json', json);
            console.log(json)
        }
    });
}