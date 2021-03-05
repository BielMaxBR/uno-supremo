if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}


const prefix = '[CREATE] '
const SalaClass = require('../Classes/RoomClass.js')

const client = require('../redis-client.js')
const resEnum = {"EXIST":0, "EMPTY":1, "ERRO":2}

module.exports = async function(nome) {
    let obj = {}
    return new Promise( resolve =>{ 
        client.hgetall('Rooms', async (err,data)=>{
            if (err){
                console.log(prefix+err);
                return new Promisse((res)=>{ res(resEnum.ERRO) })
            }
            
            console.log("tem: ", data)
            if (data) {
                obj = data
            }

            console.log(obj[nome])
            if(nome.trim().length == 0) { resolve(resEnum.EMPTY);console.log('EMPTY')  }
            if (obj[nome] != undefined) { resolve(resEnum.EXIST);console.log('EXIST')  } 
            
            obj[nome] = JSON.stringify(new SalaClass())
            console.log(obj)
            
            await client.hmset('Rooms', obj)
            resolve(obj) 
            
        })
    })
}