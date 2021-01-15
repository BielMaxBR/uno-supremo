const bodyParser = require('body-parser')
    ,socketIo = require('socket.io')
    ,express = require('express')
    ,path = require('path')
    ,http = require('http')
    ,app = express()
    ,server = http.createServer(app)
    ,io = socketIo(server)
    ,WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 })
    ,socketController = require('./socketController.js');

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'front')))

io.sockets.on('connection', socketController)
wss.on('connection', function connection(ws) {
    console.log('Weebsocket conectado')
    ws.on('ping',()=>{
        console.log('Websocket ouvido')
    }) 
})
module.exports = server
