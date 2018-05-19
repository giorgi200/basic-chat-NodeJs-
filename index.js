var express = require('express');
var socket = require('socket.io');
var fs = require('fs');

var visitor_names = [ ];

var app = express();
 
var server = app.listen(4000, function() {
    console.log('it is working');    
})

app.use(express.static('public'));


var io = socket(server);
io.on('connection', function(socket) {

    socket.on('edit', function(data) {
        socket.broadcast.emit('edit', data);
    })

    socket.on('del', function(data) {
        io.sockets.emit('del', data);

        visitor_names.slice(data.del_id);
        console.log(visitor_names[data.del_id]);
    })

    socket.on('chat', function(data) {
        var d = new Date();
        
        var key = {
            id: visitor_names.length + 1,
            სახელი: data.name,
            დრო: d.getHours() + ":" + d.getMinutes()
        }

        io.sockets.emit('chat', data);
        visitor_names.push(key);
        io.sockets.emit('lens', {
            
            leng:visitor_names.length,
        
        });

        fs.writeFile('./visitors.json', JSON.stringify(visitor_names, null, 4), (err) => {
           
            if (err) {
                console.error(err);
            }      
        })

    });
})

