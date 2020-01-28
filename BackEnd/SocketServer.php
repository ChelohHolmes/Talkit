<?php
include 'Header.php';
require 'C:\Users\Marcelo Ramirez\Talkit/FrontEnd/vendor/autoload.php';
use \Workerman\Worker;
use \PHPSocketIO\SocketIO;

$io = new SocketIO(1112);
$io->on('connection', function($socket)use($io) {
    $socket->on('message', function($data)use($io) {
        $io->emit('message', $data);
    });
    $socket->on('timer', function($data)use($io) {
        $io->emit('timer', $data);
    });
    $socket->on('endTurn', function($data)use($io) {
        $io->emit('endTurn', $data);
    });
    $socket->on('vote', function($data)use($io) {
        $io->emit('vote', $data);
    });
    $socket->on('kickVote', function($data)use($io) {
        $io->emit('kickVote', $data);
    });
    $socket->on('topic', function($data)use($io) {
        $io->emit('topic', $data);
    });
    $socket->on('askTurn', function($data)use($io) {
        $io->emit('askTurn', $data);
    });
    $socket->on('broadcast', function($data)use($io, $socket) {
        $socket->broadcast->emit('broadcast', $data);
    });
});
Worker::runAll();