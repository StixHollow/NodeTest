function Player(ipPlayer, game) {	
    
    this.NB_CARD_BY_PLAYER = 3;
    
    this.id; // id unique du/de joueur-euse  
    this.game = game; // objet game auquel player appartient
    this.ip = ipPlayer; // ip du/de la player

    this.cards = new Array(); // tableau contenant les cartes
    
    this.setUniqueId(ipPlayer);
    
}


Player.prototype.setDeck = function() {

    for (j = 0; j < this.NB_CARD_BY_PLAYER; j++) {
        this.cards.push(this.game.deck.takeCard()); 
    }
}

Player.prototype.setUniqueId = function(ip){
    var creationID = ip + ':' + Math.floor(Math.random()*10000);
    this.id = creationID;
    return creationID;
}

module.exports = Player;