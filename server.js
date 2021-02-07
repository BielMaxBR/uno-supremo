const app = require('./src/app')
const fs = require('fs')
fs.exists('./src/salas.json', function(exists){
    var obj = {}
    var json = JSON.stringify(obj);
    fs.writeFileSync(path='./src/salas.json', json);
})
const porta = process.env.PORT || 3333
app.listen(porta)

console.log('Escutando na porta '+porta.toString())