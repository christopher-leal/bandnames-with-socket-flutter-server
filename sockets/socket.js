const { io } = require('./../server');

const Bands = require('./../models/bands');
const Band = require('../models/band');

const bands = new Bands()

bands.addBand(new Band('Queen'))
bands.addBand(new Band('Queen 2'))
bands.addBand(new Band('Queen 3'))
bands.addBand(new Band('Queen 4'))

// mensajes de sockets
io.on('connection', (client) => {
    console.log('cliente conectado');

    client.emit('active-bands', bands.getBands())

    client.on('disconnect', () => {
        console.log('cliente desconectado');
    });

    client.on('message', (payload) => {
        console.log(payload);

        io.emit('message', { admin: 'Nuevo mensaje' })
    });

    client.on('new-message', (payload) => {
        console.log(payload);

        client.broadcast.emit('new-message', payload)
    });

    client.on('vote-for-a-band', (payload) => {
        console.log(payload);
        bands.voteBand(payload.id)
        io.emit('active-bands', bands.getBands())

    });

    client.on('add-band', (payload) => {
        console.log(payload);
        bands.addBand(new Band(payload.name))
        io.emit('active-bands', bands.getBands())

    });

    client.on('delete-band', (payload) => {
        console.log(payload);
        bands.deleteBand(payload.id)
        io.emit('active-bands', bands.getBands())

    });

});

