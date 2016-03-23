'use strict'; 

/* --------- INITIALISATION ------------ */
var conf = require( __dirname  + "/js/config.js" );
var deck = require( __dirname  + "/js/Deck.class.js" );
var game = require( __dirname  + "/js/Game.class.js" );
var msg = conf.getMsgServer();

/* -- Module de nodejs -- */
// Ajoute les couleurs dans la console -> https://github.com/marak/colors.js/ 
require('colors');

var express = require('express');
var app = express();
var mustacheExpress = require('mustache-express');
var url = require('url');
//var session = require('express-session');

// Ceration du serveur avec expressjs et le module http
// -> https://openclassrooms.com/courses/des-applications-ultra-rapides-avec-node-js/socket-io-passez-au-temps-reel
// -> http://www.learnfast.ninja/posts/53a6b961d972e2e411bf82f2
var server = require('http').Server(app);
var io = require('socket.io')(server);

/* -- end - Module de nodejs -- */

// recupertation du port en fonction du port défini dans config.js
var listener = server.listen(conf.port);

var Games = [];

/* --------- END INITIALISATION ------------ */

/*  how to creat a new class
    // http://stackoverflow.com/questions/6998355/including-javascript-class-definition-from-another-file-in-node-js
    var g = new game('aisdhiashd');
    console.log(g.create());
*/

// permet l'utilisation de mustache template
// -> https://www.npmjs.com/package/mustache-express
app.engine('mustache', mustacheExpress());

// Met en place le systeme de vue MUSTACHE
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
// resolution du problème des ressources dans les views
// http://stackoverflow.com/questions/18409374/cannot-find-view-in-node-express
app.use(express.static(__dirname + '/views'));

// -> http://mustache.github.io/#demo


/* // Utilisation des variables de sessions en nodejs
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

/* --- ROUTE EXPRESS--- */
// -> https://openclassrooms.com/courses/des-applications-ultra-rapides-avec-node-js/le-framework-express-js
// gestion de la route root (HUMOUR CODE)
app.get('/', function(req, res){
    
    // Affichage de la template de page d'index (index.mustache)
    res.render('index', {

        title: 'Cheater Game', // nom de la page
        person: 'Partner' // Je ne sais pas encore pourquoi j'ai mis ça
    
  });
})
// gestion d'un appelle de partie
.get('/game/:id', function(req, res) {
    // Affichage de la template de page de jeu (game.mustache)
    res.render('game', {
    
        title: req.params.id, // nom de la page
        // path: __dirname // envoi de la path source du serveur -- je ne sais pas s'il y a encore une utilite à ça
    
  });
})
// redirection erreur 404
.use(function(req, res, next){
    // page index
    res.redirect('/');

})

/* --- END ROUTE --- */


/* ---- SOCKET CONNECTION ---- */
io.sockets.on('connection', function (socket) {
    
    // recuperation de l'url de la partie
    // -> https://nodejs.org/api/url.html
    var u = url.parse(socket.handshake.headers.referer).pathname;
    var room = u.substr(u.lastIndexOf('/') + 1); // parsing de l'url
    
    /*
    if (room in Games) {
        
    } else {
        
    }
       */ 
    
    // ajout de l'utilisateur-trice à la room de la partie
    // -> http://socket.io/docs/rooms-and-namespaces/
    socket.join(room);
    
    // verification si la parti existe dejà
    if (typeof Games[room] == 'undefined'){
        // creation d'une nouvelle partie et du deck qui va avec
        var d = new deck();
        Games[room] = new game(room, d);
        // ajout d'un nouveau joueur
        Games[room].newPlayerConnected();
    } else {
        // partie dejà existant, ajout simplement d'un nouveau joueur
        Games[room].newPlayerConnected();

    }
    // http://stackoverflow.com/questions/31468473/how-to-get-socket-io-number-of-clients-in-room
    // var useroom = io.sockets.adapter.rooms[room];
    
    // affichage d'un message d'un nouvelle utilisateur connecte
    console.log((msg[210] + room).toString().cyan);

    // envoi à tout les utilisateur-trice-s le message de nouvelles connection
    socket.broadcast.to(room).emit("msgToUser", msg[300]);
    socket.emit("ConnectSuccess", { msg: msg[200], room: room, dirname: __dirname });
        
    // lancement de la partie si le nombre de joueurs est superieur à 2
    if (io.sockets.adapter.rooms[room].length == 2) {
        
        // affichage que la partie peut commencer
        console.log((msg[224] + room).toString().magenta);
        // envoi du message que la partie peut commencer
        socket.to(room).emit("msgToUser", msg[304]);
        socket.emit("msgToUser", msg[304]);
        
        // distribution des cartes aux joueurs
        if (Games[room].start()){
            
            // envoi au joueur 0
            socket.emit("cards", {
                
                myDeck:  Games[room].cardPlayer[0],
                type: 'startDeck'
            
            });
            // envoi au joueur 1
            
            socket.to(room).emit("cards", { 
                myDeck:  Games[room].cardPlayer[1],
                type: 'startDeck'
            });
            // affichage de l'envoi des cartes
            console.log(msg[226].toString().grey);
            
        }
    }
    
    // gestion du click sur le bouton de deconnection
    socket.on('disconnectmsg', function(room){
        
        // affichage qu'un joueur c'est deconnecte 
        console.log((msg[202] + room).toString().orange); // ---> ERREUR IMPOSSIBLE DE FAIRE UN CONSOLELOG ICI ??????
        // Envoi du message de deconnection aux joueurs
        socket.broadcast.to(room).emit("msgToUser", msg[302]);
        //Games[room] // Modifier utilisateur
        socket.leave(room); // suppression du joueur de la partie
        
    });
    
});

/* ---- END SOCKET CONNECTION ---- */

// affichage du lancement du serveur
console.log((msg[100] + listener.address().port).toString().green); //Listening on port 8080
