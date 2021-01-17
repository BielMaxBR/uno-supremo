const canvas = document.getElementById('view')
    ,ctx = canvas.getContext('2d')
    ,img = image = document.getElementById('source');

function draw() {
    ctx.clearRect(0,0,1000,1000)
    ctx.drawImage(img, 0, 0, 256, 256)
}

setTimeout(draw,100)

const socket = io.connect(location.href);
let connected = false

let myName = ''
let roomsOn = []
socket.on('connect',()=>{
    connected = true
})

socket.on('updateRooms', (rooms) =>{
    console.log(rooms)
    let salas = document.getElementById('rooms')
    roomsOn = rooms
    salas.innerHTML = ''
    for ( sala in roomsOn ) {
        salas.innerHTML += '<li>'+roomsOn[sala]
            +"<button style=\"\" onclick=\"connect(myName.toString(),\'"
            +roomsOn[sala]+"\')\">Entrar</button>"+'</li>'
    }
})

function createRoom(room) {
    if (connected) {
        socket.emit('createRoom',room)
    }
}

function connect(name, sala) {
    if (name) {
        connected = true
        socket.emit('addUser', name, sala)
    }
    else {
        console.log('insira um nome')
    }
}

document.getElementById('myname').addEventListener('keyup', function(){
    myName = this.value
});

document.getElementById('myroom').addEventListener('keyup', function(e){
    let key = e.code;
    if (key == "Enter") {
        createRoom(this.value)
        this.value = ""
    }
});