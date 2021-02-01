let redis = require('redis')
  /* Values are hard-coded for this example, it's usually best to bring these in via file or environment variable for production */
let client    = redis.createClient({
    port      : 14194, 
    host      : 'redis-14194.c245.us-east-1-3.ec2.cloud.redislabs.com', 
    password  : 'FR57jeWZfetJJG6xNhBOIz19hUb3PaDq',
  });

client.on('ready', ()=>{
    console.log('pronto')
    client.set("test", [0,1,2,3], redis.print);
    client.get("test", redis.print);
    client.del("test", redis.print);
    client.get("test", redis.print);
    client.quit()
})