/*
    
    
    -> http://openmymind.net/2012/2/3/Node-Require-and-Exports/
*/
function Game(room, deck) {	
    
    this.room = room; 
    this.partyStarted = false;
    this.nbPlayerInRoom = 0;
    this.deck = deck;

}



Game.prototype.newPlayerConnected = function() {
    
    this.newPlayerConnected += 1;
    
    return this.newPlayerConnected;
}

module.exports = Game;