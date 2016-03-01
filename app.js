var express = require('express');
var app = express();
var mustacheExpress = require('mustache-express');
var url = require('url');

var server = require('http').Server(app);
var io = require('socket.io')(server);

var listener = server.listen(8080);

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.set('title', 'Cheater');


/* --- ROUTE --- */
app.get('/', function(req, res){
  res.render('index', {
    
        title: 'Le jeu',
        person: 'Partner'
    
  });
});

app.get('/game/:id', function(req, res) {

    res.render('game', {
    
        title: req.params.id,
        person: 'Partner'
    
  });
});

/* --- END ROUTE --- */


// Emet un message lors d'une nouvelle connection
io.sockets.on('connection', function (socket) {
    //var u = url.parse(req.url).pathname;
    
    console.log(socket.conn);
    
    console.log('New user Connected on : ' + socket.conn);
    //socket.join(u.path);
    
});


console.log('Application en marche sur le port ' + listener.address().port); //Listening on port 8080