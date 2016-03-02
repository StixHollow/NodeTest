/*
    
    
    -> http://openmymind.net/2012/2/3/Node-Require-and-Exports/
*/
function Deck(room) {	
    
    this.deck = []; 
    

}

Deck.prototype.setDeck = function() {
    
    var sign = ['K', 'C', 'P', 'T'];
    var ext = '.BMP';
    var nameCard;
    var deckOrder = [];

    for (i = 0; i <= 3; i++) {
        for (j = 1; j < 14 ; j++) {
            nameCard = j + sign[i] + ext;
            deckOrder.push(nameCard);
        }
    }
    return deckOrder;
}

Deck.prototype.mixDeck = function(deck) {
    // !!!!!!!!!!!! à commenter et tester !!!!!!!!!!!!!
    var mixedDeck = [];
    var nbTurn = 51; // je ne sais pas trop à quoi ça sert la
    var index = 0; // index aleatoire ou va être placé la carte
    var nbCard = 52;
    var calc = 0;
    
    for (i = 0; i <= nbTurn; i++) {
        if ((i % 2) == 1 && i != 0 ) {
            do {
                index = (Math.random() * (nbCard-1));
            } while ( i == 0 || i == nbTurn || ((i > 0) && (mixedDeck[i -1].substring(2,3) != deck['index'].substring(2,3))) )
        } else {
            index = (Math.random() * (nbCard-1));
        }
    
        mixedDeck[i] = deck[index];

        for (j = 0; j < (nbCard - index); j++) { 
     
            if ((index + j +1) < NbCard) { 
                calc = index + j + 1;
                deck[index + j] = mixedDeck[calc];
            }
       
        }
     
        deck.splice(nbCard -1);
        nbCard = nbCard - 1;
    }
}

module.exports = Deck;