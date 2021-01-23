module.exports = (socket,sala,tipo, ...args) => {
    switch(tipo) {
        case "addUser":
            socket.to(sala).emit('updateChat', "SERVER", args[0].toString()+" entrou na sala", 'blue')
            break;
        case "removeUser":
            socket.to(sala).emit('updateChat', "SERVER", args[0]+" saiu na sala", 'blue')
            break;
        case "enterRoom":
            socket.emit('updateChat', "SERVER", "você entrou em "+sala, 'green')
            break;
        case "leaveRoom":
            socket.emit('updateChat', "SERVER", "você saiu de "+sala, 'green')
            break;
        case "myTurn":
            socket.emit('updateChat', "SERVER", "agora é seu turno", 'yellow')
            break;
        case "userTurn":
            socket.broadcast.emit('updateChat', "SERVER", "agora é o turno de "+args[0].toString(), 'yellow')
            break;
        case "error":
            socket.emit('updateChat', "SERVER", "erro: "+args[0], 'red')
            break;
    }
}