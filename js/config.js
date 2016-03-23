'use strict'; 

module.exports = {
  
    port: '8080',
    maxplayer: '2',
    
    getMsgServer: function () {
    
        var array_msg = {
            
            // messages du serveur (console.log)
            100 : 'Application en marche sur le port ',
            
            // messages suivie d'information variable relative à l'utilisateur-trice (console.log)
            200 : 'Connection au serveur établie avec la partie : ', 
            202 : 'Un-e utilisateur-trice à quitté la partie',
            
            210 : 'Nouvelle utilisateur-trice connecté-e à la partie : ',
            212 : 'Nombre de joueur-euse connecté à la room : ',
            
            // message relative à la partie
            220 : 'La partie à été créer ',
            222 : 'La partie à été mise à jour ',
            224 : 'La partie peut commencer en ',
            226 : 'Carte envoyées ',
            
            // messages émis vers le client
            300 : 'Nouveau-elle joueur-euse connecté à la partie',
            302 : 'Un utilisateur-trice à quitté la partie',
            304 : 'Suffisament de joueur dans la partie: le jeu peut commencer'
            
        }
      
        return array_msg;
    } 
};