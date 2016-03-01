/* -- Module de nodejs -- */
var express = require('express');
var app = express();
var mustacheExpress = require('mustache-express');
var url = require('url');

var server = require('http').Server(app);
var io = require('socket.io')(server);

var listener = server.listen(8080);

// permet l'utilisation de mustache template
app.engine('mustache', mustacheExpress());

// Met en place le systeme de vue
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');


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
        
    // ajout de l'utilisateur-trice à la room de la partie
    socket.join(room);
    console.log('Nouvelle utilisateur-trice connecté-e à la partie ' + room);

    socket.to(room).emit("NewConnection", "Nouvelle utilisateur-trice");
    socket.emit("ConnectSuccess", "Connection Reussi");
    
    
});


console.log('Application en marche sur le port ' + listener.address().port); //Listening on port 8080