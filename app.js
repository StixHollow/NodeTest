'use strict'; 

var conf = require( __dirname  + "/js/config.js" );

/* -- Module de nodejs -- */
require('colors');
var express = require('express');
var app = express();
var mustacheExpress = require('mustache-express');
var url = require('url');
//var session = require('express-session');

var server = require('http').Server(app);
var io = require('socket.io')(server);

var listener = server.listen(8080);

var Games = [];

// permet l'utilisation de mustache template
app.engine('mustache', mustacheExpress());

// Met en place le systeme de vue
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

/*
app.use(session({
    secret: 'SuperNain007',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.use(function (req, res, next) {
    req.session.nbPlayer = 0;
    
})
*/

/* --- ROUTE --- */
app.get('/', function(req, res){
  res.render('index', {
    
        title: 'Le jeu',
        person: 'Partner'
    
  });
})
.get('/game/:id', function(req, res) {
    
    res.render('game', {
    
        title: req.params.id
    
  });
})
.use(function(req, res, next){

    res.redirect('/');

})

/* --- END ROUTE --- */


// Reception d'une nouvelle connection
io.sockets.on('connection', function (socket) {
    
    // recupération de l'url de la partie
    var u = url.parse(socket.handshake.headers.referer).pathname;
    var room = u.substr(u.lastIndexOf('/') + 1);
   
    /*
    if (room in Games) {
        
    } else {
        
    }
       */ 
    
    // ajout de l'utilisateur-trice à la room de la partie
    socket.join(room);
    console.log('Nouvelle utilisateur-trice connecté-e à la partie '.blue + room + 'Nb de player : ' );

    socket.broadcast.to(room).emit("msgToUser", "Nouvelle utilisateur-trice");
    socket.emit("ConnectSuccess", { msg: 'Connextion au serveur établie avec la partie : ', room: room });
    
    socket.on('disconnectmsg', function(room){
        console.log('Un utilisateur-trice en moins sur ' + room);
        socket.broadcast.to(room).emit("msgToUser", "Un utilisateur-trice à quitté la partie");
        //Games[room] // Modifier utilisateur
        socket.leave(room);
    });
    
});


console.log('Application en marche sur le port '.green + listener.address().port); //Listening on port 8080