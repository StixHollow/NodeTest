// lien vers le dossier des cartes
const dirImgCards = '/cards/';
// url du serveur nodejs
const urlServer = 'http://localhost:8080';

// variable contenant la socket
var socket;
// nom de la partie (room)
var roomName;
// chemin vers le root du de l'app
var rootdir;

// initialisation 
function ini(){
    // initiatialisation du lien de l'url de la partie
    $("#url-party").val($(location).attr('href'));
    
    // connection de la socket
    socket = io.connect(urlServer);
}

// Installation des evenements sur les bouton
function installEvent(){
    //  Ajout de l'evenemnt de deconnection de la partie
    $("#disconnect").on('click', function(){ 
        // emmission d'un message de deconnection
        socket.emit('disconnectmsg', roomName);
        // redirection vers la page d'accueil
        document.location.href= "/";
    });
    
    // selection du contenu de l'input avec l'url de la partie
    $("#url-party").on('click', function(){ this.select(); });   
}
function onClickCard(){
    alert(this.dataset.cardName);
}

// met en place la main de l'utilisateur
function setHandUser(myDeck){
    $("#my-space").empty();
    for (i = 0; i < myDeck.length; i++){
        $("#my-space").append('<img class="cardImg" src="' + dirImgCards + myDeck[i] + '" data-cardName="' + myDeck[i] + '">' );
        // $(".cardImg").on('click', onClickCard()); 
        // BUG AVEC LA RECUPERATION DU DATASET BORDEL
        // $("#my-space").append('<div class="">' + dirImgCards + data.myDeck[i] + '</div>' );
    }
}

// Installation des listeners des messages du serveur
function iniListenerServer(){
    
    // Ecoute la connection avec succes vers le serveur
    socket.on('ConnectSuccess', function(data) {
        // recupération des donnees envoyés par le serveur
        roomName = data.room;
        rootdir = data.dirname;
        // affichage du message
        
        $("#servermsg").append('<div class="alert alert-success msgctrl"  role="alert">' + data.msg + data.room +'</div>');
    });
    
    // recuperation des message du serveur
    socket.on('msgToUser', function(msg) {
        $("#servermsg").append('<div class="alert alert-info msgctrl"  role="alert">' + msg +'</div>');
    });
    
    // recuperation des carte a afficher
    socket.on('cards', function(data) {
        console.log(data);
        // affichage du deck envoyers par le serveur
        switch (data.type){
            case 0:
            case 'startDeck':
                setHandUser(data.myDeck);
            break;
                
                
        }
        

    });
    
}

