try {
    const ws = new WebSocket('wss://8080-e0e5ada3-0298-4380-8010-5074091bf40e.ws-us03.gitpod.io/');
    ws.onopen = function () {
        ws.send('ping')
    };
}
catch (err) {
    console.log(err)
}

const canvas = document.getElementById('view')
    ,ctx = canvas.getContext('2d')
    ,img = image = document.getElementById('source');

function draw() {
    ctx.clearRect(0,0,1000,1000)
    ctx.drawImage(img, 0, 0, 256, 256)
}

setTimeout(draw,100)

var server = io.connect(location.href);

