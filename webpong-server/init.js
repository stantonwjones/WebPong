var http = require('http');
var fs = require('fs');
var sio = require('socket.io');
var ws = require('./lib/ws.js');

var webserver = http.createServer(handleHttpRequest);
var socketserver = ws.createServer(handleSocketMessage).listen(8080);;

var wsClients = [];

function handleHttpRequest(request, response) {
}

function handleSocketMessage(websocket) {
    websocket.on('connect', function(resource) {
        clients.push(websocket);
        websocket.write('Welcome');
    });

    websocket.on('data', function(data) {
        clients.forEach(function(client) {
            client.write(data);
        });
    });
}
