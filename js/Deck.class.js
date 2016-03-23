/*
    
    
    -> http://openmymind.net/2012/2/3/Node-Require-and-Exports/
*/
function Deck() {	
    
    this.deck = this.mixDeck(this.setDeck());
    this.nbCardInDeck = this.deck.length;

}

/* 
    Initialise le deck dans l'ordre
*/
Deck.prototype.setDeck = function() {
    
    var sign = ['K', 'C', 'P', 'T'];
    var ext = '.BMP';
    var nameCard;
    var deckOrder = new Array;

    for (i = 0; i <= 3; i++) {
        for (j = 1; j < 14 ; j++) {
            nameCard = j + sign[i] + ext;
            deckOrder.push(nameCard);
        }
    }
    return deckOrder;
}

/* 
    Mélange le deck
*/
Deck.prototype.mixDeck = function(deck) {
    
    var index; // index à changer
    var save; // valeur tmp
    
    for(i = deck.length-1; i >= 1; i--){
	
	   //hasard reçoit un nombre entier aléatoire entre 0 et position
	   index=Math.floor(Math.random()*(i+1));
	
	   //Echange
	   save = deck[i];
	   deck[i] = deck[index];
	   deck[index] = save;

    }
    return deck;  
}

/* 
    Recupération du nom de la carte
*/
Deck.prototype.parseCardName = function(card){
    var name = card.substring(0, card.lastIndexOf('.'));
    return name;
}

/* 
    Pioche un carte
*/
Deck.prototype.takeCard = function() {
   
    var card;
    
    if(this.nbCardInDeck != 0){
        card = this.deck[this.deck.length - 1];
        this.deck.pop();
        this.nbCardInDeck--;
    } else {
        card = false;
    }
    
    return card;  
}

module.exports = Deck;