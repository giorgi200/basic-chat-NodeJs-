var express = require('express');
var socket = require('socket.io');

var app = express();
 
var server = app.listen(4000, function() {
    console.log('it is working');    
})

app.use(express.static('public'));

var io = socket(server);

io.on('connection', function(socket) {
    socket.on('chat', function(data) {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    });
    socket.on('online', function(data) {
        socket.broadcast.emit('online', data);
    });

    socket.on('change', function(data) {
        socket.broadcast.emit('change', data);
    });

})