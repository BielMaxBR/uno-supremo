const app = require('./src/app')
    ,io = require('./src/socketIO')
    ,socketController = require('./src/socketController.js')

const porta = process.env.PORT || 3333

app.listen(porta)
io.sockets.on('connection', socketController)

console.log('Escutando na porta '+porta.toString())