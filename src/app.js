const express = require('express')
    , path = require('path')
    , http = require('http')
    , app = express()
    , server = http.createServer(app)

const router = express.Router()

app.use(`/.netlify/functions/api`, router);
app.use(express.static(path.join(__dirname, '../front')))

module.exports = server
