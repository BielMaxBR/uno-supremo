const fs = require('fs')
const createRoom = require('./controllers/createRoom.js')
const getRooms = require('./controllers/getRooms.js')
const addUser = require('./controllers/addUser.js')
const removeUser = require('./controllers/removeUser.js')
const redis = require('./redis-client.js')


module.exports = async function(socket, io) {
    console.log('Socket conectado')
    // await redis.del('PlayerLists')
    if (await redis.get('PlayerLists') == null || await redis.get('PlayerLists') == {}) {
        let newId = socket.id
        let newList = {}
        newList[newId] = newId
        await redis.set('PlayerLists', newList)
    }
    console.log(await redis.get('PlayerLists'))

    // createRoom('sala')
    getRooms(async salas => {
        await socket.emit('updateRooms', Object.keys(salas))
        // console.log('wow!', salas)
    })

    fs.watch('./src/salas.json', (event, nome) => {
    if (nome) {
        if (event == 'change') {
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
    }

    });

    await socket.on('createRoom', nome => {createRoom(nome,socket)})
    await socket.on('addUser', (username, sala)=>{ addUser(username, sala, socket); console.log('addUser\n') })
    await socket.on('disconnect', ()=>{
        // disconnectPlayer
        // delete TotalPlayers[socket.id]
        removeUser(socket)
    })
    await socket.on('message', msg => {
        io.to(socket.room).emit('updateChat', socket.username, msg)
    })
}