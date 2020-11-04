const { io } = require('./../server');
// mensajes de sockets
io.on('connection', (client) => {
    console.log('cliente conectado');
    client.on('disconnect', () => {
        console.log('cliente desconectado');
    });

    client.on('message', (payload) => {
        console.log(payload);

        io.emit('message', { admin: 'Nuevo mensaje' })
    });

});

