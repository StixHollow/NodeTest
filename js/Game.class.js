/*
    -> http://openmymind.net/2012/2/3/Node-Require-and-Exports/
*/
function Game(room, deck) {	
    
    this.room = room; 
    this.partyStarted = false;
    this.nbPlayerInGame = 0;
    this.deck = deck;

}



Game.prototype.newPlayerConnected = function() {
    
    this.newPlayerConnected += 1;
    
    return this.newPlayerConnected;
}

Game.prototype.CanStart = function() {
    var r = false;
    
    if (this.newPlayerConnected >= 2) {
        r = true;
    }
    return r;
}

Game.prototype.start = function() {
    
}

module.exports = Game;