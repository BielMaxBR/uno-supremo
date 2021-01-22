module.exports = (socket,sala,tipo, ...args) => {
    switch(tipo) {
        case "addUser":
            socket.to(sala).emit('updateChat', "SERVER", args[0].toString()+" entrou na sala")
    }
}