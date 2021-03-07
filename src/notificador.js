const io = require('./socketIO')

module.exports = (sala,tipo, ...args) => {
    switch(tipo) {
        case "addUser":
            args[0].to(sala).emit('updateChat', "SERVER", args[1].toString()+" entrou nessa sala", 'blue')
            break;
        case "removeUser":
            args[0].to(sala).emit('updateChat', "SERVER", args[1]+" saiu nessa sala", 'blue')
            break;
        case "enterRoom":
            io.to(sala).emit('updateChat', "SERVER", "você entrou em "+args[0], 'green')
            break;
        case "leaveRoom":
            io.to(sala).emit('updateChat', "SERVER", "você saiu de "+args[0], 'green')
            break;
        case "myTurn":
            io.to(sala).emit('updateChat', "SERVER", "agora é seu turno", 'yellow')
            break;
        case "userTurn":
            io.to(sala).emit('updateChat', "SERVER", "agora é o turno de "+args[0].toString(), 'yellow')
            break;
        case "initGame":
            io.to(sala).emit('updateChat', "SERVER", "A partida vai começar", 'green')
            break;
        case "error":
            io.to(sala).emit('updateChat', "SERVER", "erro: "+args[0], 'red')
            break;
    }
}