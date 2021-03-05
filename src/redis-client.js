let redis = require('redis')

require('dotenv').config();

let client    = redis.createClient({
    port      : process.env.REDIS_PORT, 
    host      : process.env.REDIS_HOST, 
    password  : process.env.REDIS_PASSWORD,
  });

client.on('ready', ()=>{
    console.log('redis conectado')
    client.del('PlayerLists')
})

module.exports = client