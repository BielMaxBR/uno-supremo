if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}
const canvas = document.getElementById('view')
    ,ctx = canvas.getContext('2d')
    ,img = image = document.getElementById('source');

function draw() {
    ctx.clearRect(0,0,1000,1000)
    ctx.drawImage(img, 0, 0, 256, 256)
}

setTimeout(draw,100)

const socket = io.connect("https://3333-e0e5ada3-0298-4380-8010-5074091bf40e.ws-us03.gitpod.io/");
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
        salas.innerHTML += '<li>'+'<div class=\'nomeSala\'>'+roomsOn[sala]+'</div>'
            +"<button style=\"\" onclick=\"connect(myName.toString(),\'"
            +roomsOn[sala]+' '+"\')\">Entrar</button>"+'</li>'
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
        socket.emit('addUser', name, sala.trim())
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
        createRoom(this.value.trim())
        this.value = ""
    }
});

document.getElementById('mytext').addEventListener('keyup', function(e){
    var key = e.code;
    if (key == "Enter" && this.value != "") {
        try{
            chat(this.value)
        }
        catch(err) {
            console.log(err)
        }
        this.value = ""
    }
});
