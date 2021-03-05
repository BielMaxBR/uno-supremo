const socketIo = require('socket.io')
    ,express = require('express')
    ,path = require('path')
    ,http = require('http')
    ,app = express()
    ,server = http.createServer(app)
    ,io = socketIo(server)


const socketController = require('./socketController.js')
    // ,wss = new WebSocket.Server({ port: 8080 })
const router = express.Router()
app.use(`/.netlify/functions/api`, router);
// app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../front')))

io.sockets.on('connection', (socket) => {socketController(socket, io)})
// wss.on('connection', function connection(ws) {
//     console.log('Weebsocket conectado')
//     ws.on('ping',()=>{
//         console.log('Websocket ouvido')
//     }) 
// })
module.exports = server
