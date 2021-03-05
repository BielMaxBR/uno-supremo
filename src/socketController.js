const createRoom = require('./controllers/createRoom.js')
const getRooms = require('./controllers/getRooms.js')
const addUser = require('./controllers/addUser.js')
const removeUser = require('./controllers/removeUser.js')
const client = require('./redis-client.js')
const notifier = require('./notificador.js')

module.exports = async function(socket, io) {
    console.log('Socket conectado')
    socket.room = ''
    let newId = socket.id
    await client.lpush('PlayerLists', newId)

    await client.lrange('PlayerLists', 0 , -1, async (err, data)=>{
        
        console.log(data)
    })

    // createRoom('sala')
    getRooms(async salas => {
        await socket.emit('updateRooms', Object.keys(salas))
        // console.log('wow!', salas)
    })

    function updateRooms() {
        try {
            console.log('wew!')
            getRooms(async salas => {
                await socket.emit('updateRooms', Object.keys(salas))
                await socket.broadcast.emit('updateRooms', Object.keys(salas))
                // console.log('wow!', salas)
            })
        }
        catch(err) {
            console.log(err)
        }
    }
    
    await socket.on('createRoom', async nome => {await createRoom(nome).then(res=>{
        switch(res) {
            case 0:
                notifier(socket,socket.id,"error","essa sala já existe")
                break;
            case 1:
                notifier(socket,socket.id,"error","insira um nome na sala")
                break;
            case 2:
                notifier(socket,socket.id,"error","ocorreu um erro no servidor")
                break;
            default:
                console.log("outro: ",res)
                updateRooms()
                break;
            }

        })
    })

    await socket.on('addUser', (username, sala)=>{ addUser(username, sala, socket); console.log('addUser\n') })
    await socket.on('disconnect', ()=>{
        // disconnectPlayer
        // delete TotalPlayers[socket.id]
        client.lrem('PlayerLists', 1, socket.id)
        removeUser(socket)
    })
    await socket.on('message', msg => {
        io.to(socket.room).emit('updateChat', socket.username, msg)
    })
}