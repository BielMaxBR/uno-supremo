setTimeout(()=>{
    var ctx = document.getElementById('view').getContext('2d')
    var img = image = document.getElementById('source');
    ctx.drawImage(img, 0, 0, 276, 256)
},100)
