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

const socket = io.connect(location.href);
let connected = false

let myName = ''
let roomsOn = []
let usersOn = []
socket.on('connect',()=>{
    connected = true
})

socket.on('updateRooms', (rooms) =>{
    console.log(rooms)
    let salas = document.getElementById('rooms')
    roomsOn = rooms
    salas.innerHTML = ''
    for ( sala in roomsOn ) {
        let nomeSala = roomsOn[sala]
        salas.innerHTML += '<li>'
            +"<button class =\"BotaoSala\" style=\"\" value=\""+roomsOn[sala].toString()+"\">Entrar</button>"+'<div class=\'nomeSala\'>'+nomeSala+'</div>'+'</li>'
    }
})

socket.on('updateUsers', playersList =>{
    console.log(typeof playersList)
    var players = playersList
    if (typeof playersList == "string") {
        players = [playersList]
    }
    usersOn = players
    let userList = document.getElementById('users')
    userList.innerHTML = ''
    for ( use in usersOn ) {
        userList.innerHTML += '<li>'+'<div class=\'nomeUser\'>'+usersOn[use]+'</div>'+'</li>'
    }
})

socket.on('updateChat',(username, data, color) =>{
    var chat = document.getElementById('messages')
    var style = ''
    var background = ''
    if (color == "yellow" || color == "red") {
        background = 'background: black;'
    }
    if(color) {
        style = 'style=\"color:'+color+'; '+background+'\"'
    }
    chat.innerHTML +="<li "+style+">"+"["+username+"]"+": "+data+"<li>"
    chat.scrollTop = chat.scrollHeight;
})

function createRoom(room) {
    if (connected) {
        socket.emit('createRoom',room.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))
    }
}

function connect(name, sala) {
    connected = true
    socket.emit('addUser', name, sala.trim())
    
}

function chat(msg) {
    if (connected) {
        socket.emit('message', msg)
    }
}

function ready() {
    if (connected) {
        socket.emit('Ready')
    }
}

document.addEventListener('click', event => {
    if (event.target.className == "BotaoSala") {
        connect(myName, event.target.nextElementSibling.textContent)
    }
})

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
