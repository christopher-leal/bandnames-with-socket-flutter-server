const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || port;

// node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket');

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

server.listen(port, () => console.log(`listening on http://localhost:${port}`));
