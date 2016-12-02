// lien vers le dossier des cartes
const dirImgCards = '/cards/';

// url du serveur nodejs
var ip;
var port; 

var urlServer;

// variable contenant la socket
var socket;
// nom de la partie (room)
var roomName;
// chemin vers le root du de l'app
var rootdir;

// initialisation 
function ini(ipRecived, portRecived){
    ip = ipRecived;
    port = portRecived;
    
    urlServer = ip + ':' + port;
    
    console.log(urlServer);
    // initiatialisation du lien de l'url de la partie
    $("#url-party").val($(location).attr('href'));
    
    if (localStorage.getItem('CheaterUID') == null){
        // connection de la socket
        socket = io.connect(urlServer);
    } else {
        
        socket = io.connect(urlServer, {
          'reconnection': true,
          'reconnectionDelay': 500,
          'reconnectionAttempts': 10
        });
        //var uidLocal = localStorage.getItem('CheaterUID');
        //socket = io.connect(urlServer, {uid : uidLocal});
        
    }
    
}

// Installation des evenements sur les bouton
function installEvent(){
    //  Ajout de l'evenemnt de deconnection de la partie
    $("#disconnect").on('click', function(){ 
        
        localStorage.removeItem('CheaterUID');
        // emmission d'un message de deconnection
        socket.emit('disconnectmsg', roomName);
        // redirection vers la page d'accueil
        document.location.href= "/";
    });
    
    // selection du contenu de l'input avec l'url de la partie
    $("#url-party").on('click', function(){ this.select(); });   
    
}
function onClickCard(event){
    alert(event.data.card);
    // event.data.card
}

// met en place la main de l'utilisateur
function setHandUser(myDeck){
    var idCard; 
    $("#my-space").empty();
    for (i = 0; i < myDeck.length; i++){
        idCard = 'card' + i;
        $("#my-space").append('<img id="' + idCard + '" class="cardImg" src="' + dirImgCards + myDeck[i] + '" data-cardName="' + myDeck[i] + '">' );
        idCard = "#" + idCard;
        $(idCard).on('click', {card: myDeck[i]}, onClickCard); 
        // -> http://api.jquery.com/on/
        console.log("evenement installé sur la carte " + idCard);
        // BUG AVEC LA RECUPERATION DU DATASET BORDEL
        // $("#my-space").append('<div class="">' + dirImgCards + data.myDeck[i] + '</div>' );
    }
}

// Installation des listeners des messages du serveur
function iniListenerServer(){

    // recuperation des message du serveur
    socket.on('msgToUser', function(data) {
        
        roomName = data.room;
        typeMsg = data.type;
        $("#servermsg").append('<div class="alert alert-' + typeMsg + ' msgctrl"  role="alert">' + data.msg + ' (' + roomName + ')</div>');
    });
    
    socket.on('divData', function(data) {
        switch (data.type){
            case 'uidSetter':
                var uid = data.uid;
                localStorage.setItem('CheaterUID', uid);
            break;
                
                
        }    
        
         
    });
    
    // recuperation des carte a afficher
    socket.on('cards', function(data) {
        console.log(data);
        // affichage du deck envoyers par le serveur
        switch (data.type){
            case 0:
            // si on envoie les premières carte de lancement du jeu
            case 'startDeck':
                setHandUser(data.myDeck);
            break;
                
                
        }
        

    });
    
}

