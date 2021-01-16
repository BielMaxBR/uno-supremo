const app = require('./src/app')
const fs = require('fs')
fs.exists('./src/salas.json', function(exists){
    if (exists) {
        var obj = {}
        var json = JSON.stringify(obj);
        fs.writeFileSync(path='./src/salas.json', json);
    }
})
app.listen(process.env.PORT || 3333)

console.log('escutando na porta 3333')