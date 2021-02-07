let redis = require('redis')
const JSONCache = require('redis-json')
require('dotenv').config();

let client    = redis.createClient({
    port      : process.env.REDIS_PORT, 
    host      : process.env.REDIS_HOST, 
    password  : process.env.REDIS_PASSWORD,
  });
let jsonCache = new JSONCache(client)
client.on('ready', ()=>{
    console.log('redis conectado')
})

module.exports = jsonCache