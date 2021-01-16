const canvas = document.getElementById('view')
    ,ctx = canvas.getContext('2d')
    ,img = image = document.getElementById('source');

function draw() {
    ctx.clearRect(0,0,1000,1000)
    ctx.drawImage(img, 0, 0, 256, 256)
}

setTimeout(draw,100)

var server = io.connect(location.href);
var connected = false
server.on('connect',()=>{
    connected = true
})

function createRoom(room) {
    if (connected) {
        server.emit('createRoom',room)
    }
}