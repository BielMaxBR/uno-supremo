if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}


const prefix = '[CREATE] '
const SalaClass = require('../Classes/RoomClass.js')

const { client, jsonCache } = require('../redis-client.js')
const resEnum = {"EXIST":0, "EMPTY":1, "ERRO":2}

module.exports = function(nome, socket) {
    let obj = {}
    client.lrange('Rooms', 0 , -1, async (err, data) =>{
        if (err){
            console.log(prefix+err);
            return new Promisse((res, rej)=>{ res(resEnum.ERRO) })
        }
        if (!data) {
            obj = data
        }
        if (obj[nome]) { return new Promisse((res, rej)=>{ res(resEnum.EXIST) }) } 
        else if(nome.trim() == '') { return new Promisse((res, rej)=>{ res(resEnum.EMPTY) }) }
        obj[nome] = new SalaClass()
        await jsonCache.set('Rooms', obj)
        return new Promisse((res, rej)=>{ res(obj) })
    })
    
}