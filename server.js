const app = require('./src/app')
const fs = require('fs')
fs.exists('./src/salas.json', function(exists){
    if (exists) {
        fs.unlinkSync('./src/salas.json')
    }
})
app.listen(process.env.PORT || 3333)

console.log('escutando na porta 3333')