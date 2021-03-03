if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}


const prefix = '[CREATE] '
const SalaClass = require('../Classes/RoomClass.js')

const { client, jsonCache } = require('../redis-client.js')
const resEnum = {"EXIST":0, "EMPTY":1, "ERRO":2}

module.exports = async function(nome) {
    let obj = {}
    const {err, data} = await client.hgetall('Rooms',(err,data)=>{ return {err,data} })
    
    if (err){
            console.log(prefix+err);
            return new Promisse((res, rej)=>{ res(resEnum.ERRO) })
    }

    if (data) {
        obj = data
        console.log(data)
    }

        
    console.log(nome)
    if(nome.trim() == '') { return new Promise((res, rej)=>{ res(resEnum.EMPTY) }) }
    if (obj[nome] =! undefined) { return new Promise((res, rej)=>{ res(resEnum.EXIST) }) } 
    
    obj[nome] = `${new SalaClass()}`
    console.log(obj)
    
    await client.hmset('Rooms', obj)
    return new Promise((res, rej)=>{ res(obj) })
    
    
}