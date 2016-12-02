/*
    -> http://openmymind.net/2012/2/3/Node-Require-and-Exports/
*/
var Player = require( __dirname  + "/Player.class.js" );


function Game(room, deck) {	
    
    // Nombre de joueur max par partie
    this.MAX_PLAYER = 2;
    
    this.room = room; 
    this.partyStarted = false;
    this.nbPlayerInGame = 0;
    this.deck = deck; // class deck recu en parametre
    // list de joueur contenant l'objet Player
    this.listPlayer = new Array();
    this.cardCenter = new Array();

}

Game.prototype.newPlayerConnected = function(ipPlayer) {
    
   
    this.nbPlayerInGame = this.nbPlayerInGame + 1;
    this.listPlayer.push(new Player(ipPlayer, this)) 
    
    return this.listPlayer[this.listPlayer.length-1].id;
}

Game.prototype.CanStart = function() {
    var r = false;
    
    if (this.newPlayerConnected >= 2) {
        r = true;
    }
    return r;
}

Game.prototype.start = function() {
    
    // initialisation des decks
    for (i = 0; i < this.MAX_PLAYER; i++) {
        
        this.listPlayer[i].setDeck();
    }
    
    this.cardCenter.push(this.deck.takeCard());
    
    // partie active
    this.partyStarted = true;
    
    return true;
}

module.exports = Game;