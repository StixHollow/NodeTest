var http = require('http');
var fs = require('fs');
var express = require('express');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

io.ressource = "bomm";

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('New User : connect');
    socket.emit("newUser", "Hey");
    
    socket.on('poke', function (message) {
        console.log(io.ressource + message);
        socket.broadcast.emit("newUser", "tu as cliquer<br/>");
    });	
});

server.listen(8080);

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

/*
// outil
var http = require('http');
//var url = require("url");
//var querystring = require('querystring');
var EventEmitter = require('events').EventEmitter;


var path = require('path');




// definition des variable 
var jeu = new EventEmitter();
var app = express();

// Création des événements 
jeu.on('gameover', function(message){
    console.log(message);
});

jeu.emit('gameover', 'Vous avez perdu !');


app.get('/',function(req,res){
       
     res.sendFile(path.join(__dirname + '/index.html'));

});

app.listen(1993);

/*
// fonction principal 
var FirstAction = function(req, res) {
    var page = url.parse(req.url).pathname;
    var params = querystring.parse(url.parse(req.url).query);
    console.log(page);
    
    res.writeHead(200, {"Content-Type": "text/html"});
    
    if (page == '/') {
        if ('prenom' in params) {

        res.write('Vous vous appelez ' + params['prenom'] + ' ');

        }
    }
    else if (page == '/play') {
        res.write('On joue');
    }
    else if (page == '/pause') {
        res.write('En pause');
    }
    else {
        res.writeHead(404, {"Content-Type": "text/html"});
        res.write('Il ny a rien ici');
    }
    res.end();
}

// création du serveur = 
//var httpServer =  http.createServer();
// httpServer.on('request', function(req, res) { });
var httpServer = http.createServer(FirstAction);

httpServer.listen(1993);
*/

/* <script src="https://cdn.socket.io/socket.io-1.4.5.js"></script> */