/*
    -> http://openmymind.net/2012/2/3/Node-Require-and-Exports/
*/
function Game(room, deck) {	
    
    // Nombre de joueur max par partie
    this.MAX_PLAYER = 2;
    
    this.room = room; 
    this.partyStarted = false;
    this.nbPlayerInGame = 0;
    this.deck = deck; // class deck recu en parametre
    this.cardPlayer = new Array();
    this.cardCenter = new Array();

}

Game.prototype.newPlayerConnected = function() {
    
    this.nbPlayerInGame = this.nbPlayerInGame + 1;
    
    return this.nbPlayerInGame;
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
        this.cardPlayer[i] = new Array();
        for (j = 0; j < 3; j++) {
            this.cardPlayer[i].push(this.deck.takeCard()); 
        }
    }
    this.cardCenter.push(this.deck.takeCard());
    
    // partie active
    this.partyStarted = true;
    
    return true;
}

module.exports = Game;