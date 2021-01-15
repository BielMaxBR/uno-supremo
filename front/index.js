var canvas = document.getElementById('view')
var ctx = canvas.getContext('2d')
var img = image = document.getElementById('source');
var pos = 0
function draw() {
    ctx.clearRect(0,0,1000,1000)
    // ctx.drawImage(img, pos, 0, 10, 10)
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(pos,0,10,10)
    pos+=10
    console.log('da')
    setTimeout(draw,1000)
}

// draw()

const ws = new WebSocket('wss://8080-e0e5ada3-0298-4380-8010-5074091bf40e.ws-us03.gitpod.io/');
var server = io.connect(location.href);

ws.onopen = function () {
    ws.send('ping')
};
let click = false; 
document.addEventListener( 
    'mouseup', () => click = false); 

canvas.addEventListener('mousedown',() => {
    click = true
});
document.addEventListener('mousemove', (event) => {
    if (click) {
        console.log(event);
        var mousepos = getMousePos(canvas,event)
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(mousepos.x,mousepos.y,2,2)
    }
}); 


function  getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

  return {
    x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  }
}