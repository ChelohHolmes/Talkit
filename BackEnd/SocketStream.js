var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
// var ss = require('socket.io-stream');

io.on('connection', function(socket){
    socket.on('message', function (data) {
        io.emit('message', data);
    });
    socket.on('timer', function (data) {
        io.emit('timer', data);
    });
    socket.on('endTurn', function (data) {
        io.emit('endTurn', data);
    });
    socket.on('vote', function (data) {
        io.emit('vote', data);
    });
    socket.on('kickVote', function (data) {
        io.emit('kickVote', data);
    });
    socket.on('topic', function (data) {
        io.emit('topic', data);
        // console.log(data);
    });
    socket.on('askTurn', function (data) {
        io.emit('askTurn', data);
    });
    socket.on('stream', function (data) {
        io.emit('stream', data);
        // console.log(data);
    });
    socket.on('free', function (data) {
        io.emit('free', data);
    })
    // ss(socket).on('stream', function(stream) {
    //     ss(socket).emit('stream', stream);
    // });
});

http.listen(1112, '0.0.0.0', function() {
    console.log('listening on *:1112');
});
