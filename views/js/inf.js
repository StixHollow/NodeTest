// genere une chaine de caracteres aleatoire
function randomize(){
    var r = Math.random().toString(36).substr(4, 11).toUpperCase();
    return r;

}

// gestion des evenement lier à la creation du lien vers la partie -----> Page INDEX
function manageRandomUrl(){
    
    // affichage de l'erreur
    var errorMsgDisplay = false;
    
    // generation du placeholder avec le randomize
    $('#basic-url').attr("placeholder", randomize());

    // Ajout de l'evenement sur le bouton de generation aleatoire du nom de partie
    $('#randomize').on('click', function(){
        // modification du nom de la partie avec le contenu aleatoire
        $('#basic-url').val(randomize());
    });
    
    // Evenement click du lancement de la partie
    $('#start-game').on('click', function(){
        
        // Validation du nom de partie valable
        if($('#basic-url').val().length > 5 ) {
            // Creation de l'url en fonction du nom de la partie
            var url = "/game/" + $('#basic-url').val(); 
            document.location.href= url; // redirection vers la partie
        
        } else { // En cas de nom de partie trop court affichage d'une erreur
            $("#party-location").addClass("has-error");
            if (!errorMsgDisplay){ // Si l'erreur n'est pas dejà afficher l'afficher
                errorMsgDisplay = true;
                $("#start-game").after("<div id='errormsg' class='danger'>Le nom doit contenir au minimum 5 caractère</div>");

            }
        }
    });
}
