'use strict'; 

var conf = require( __dirname  + "/js/config.js" );
var deck = require( __dirname  + "/js/Deck.class.js" );
var game = require( __dirname  + "/js/Game.class.js" );
var msg = conf.getMsgServer();

/* -- Module de nodejs -- */
// -> https://github.com/marak/colors.js/
require('colors');

var express = require('express');
var app = express();
var mustacheExpress = require('mustache-express');
var url = require('url');
//var session = require('express-session');

// -> https://openclassrooms.com/courses/des-applications-ultra-rapides-avec-node-js/socket-io-passez-au-temps-reel
// -> http://www.learnfast.ninja/posts/53a6b961d972e2e411bf82f2
var server = require('http').Server(app);
var io = require('socket.io')(server);

/* -- end - Module de nodejs -- */

var listener = server.listen(conf.port);

var Games = [];

/*  how to creat a new class
    // http://stackoverflow.com/questions/6998355/including-javascript-class-definition-from-another-file-in-node-js
    var g = new game('aisdhiashd');
    console.log(g.create());
*/

// permet l'utilisation de mustache template
// -> https://www.npmjs.com/package/mustache-express
app.engine('mustache', mustacheExpress());

// Met en place le systeme de vue
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// -> http://mustache.github.io/#demo


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
// -> https://openclassrooms.com/courses/des-applications-ultra-rapides-avec-node-js/le-framework-express-js
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


/* ---- SOCKET CONNECTION ---- */
io.sockets.on('connection', function (socket) {
    
    // recupération de l'url de la partie
    // -> https://nodejs.org/api/url.html
    var u = url.parse(socket.handshake.headers.referer).pathname;
    var room = u.substr(u.lastIndexOf('/') + 1);
   
    /*
    if (room in Games) {
        
    } else {
        
    }
       */ 
    
    // ajout de l'utilisateur-trice à la room de la partie
    // -> http://socket.io/docs/rooms-and-namespaces/
    socket.join(room);
    
    
    if (typeof Games[room] == 'undefined'){
        var d = new deck();
        Games[room] = new game(room, d);
        Games[room].newPlayerConnected();
    } else {
        Games[room].newPlayerConnected();

    }
    // http://stackoverflow.com/questions/31468473/how-to-get-socket-io-number-of-clients-in-room
    // var useroom = io.sockets.adapter.rooms[room];
    
    console.log((msg['210'] + room).toString().cyan);

    // envoi à tout les utilisateur-trice-s le message de nouvelles connection
    socket.broadcast.to(room).emit("msgToUser", msg['300']);
    socket.emit("ConnectSuccess", { msg: msg['200'], room: room, dirname: __dirname });
        
    if (io.sockets.adapter.rooms[room].length == 2) {
        console.log((msg['224'] + room).toString().magenta);
        socket.to(room).emit("msgToUser", msg['304']);
        socket.emit("msgToUser", msg['304']);
    
        if (Games[room].start()){
            socket.emit("cards", { myDeck:  Games[room].cardPlayer[0] });
            socket.to(room).emit("cards", { myDeck:  Games[room].cardPlayer[1] });
            console.log(msg['226'].toString().grey);
        }
    }
    
    // gestion du click sur le bouton de déconnection
    socket.on('disconnectmsg', function(room){
        console.log((msg['212'] + room).toString().orange);
        socket.broadcast.to(room).emit("msgToUser", msg['302']);
        //Games[room] // Modifier utilisateur
        socket.leave(room);
    });
    
});

/* ---- END SOCKET CONNECTION ---- */


console.log((msg['100'] + listener.address().port).toString().green); //Listening on port 8080