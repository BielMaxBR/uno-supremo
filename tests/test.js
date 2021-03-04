let redis = require('redis')
const {promisify} = require('util');

require('dotenv').config();

let client    = redis.createClient({
    port      : process.env.REDIS_PORT, 
    host      : process.env.REDIS_HOST, 
    password  : process.env.REDIS_PASSWORD,
  });

client.on('ready', async ()=>{
    console.log('redis conectado')
    client.del('PlayerLists')
    client.del('Rooms')
    client.quit()
})
