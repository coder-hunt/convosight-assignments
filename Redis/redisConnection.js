const redis = require('redis')    
const client = redis.createClient({host: '172.18.0.1', port: 6379 })

client.on('connect', () =>{
    console.log('Redis connected')
})

client.on('error', () => {
    console.log('Redis connection fail');
})

module.exports = client;