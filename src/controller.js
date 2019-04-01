function handleSignedInUser(firebaseUser) {
    location.hash = "#timeline";
    // contentDiv.innerHTML = 
    // `<nav id = "timeline-nav" class= "timeline-nav flex-row">
    //     <h1>madame{code}</h1>
    //     <button id = "btnLogOut">Salir</button>
    // </nav>
        
    // <article id="create-post" class="create-post">
    //     <h2>Crear Publicación:</h2>
    //     <input id="input-post" type="text" placeholder="¿Qué quieres compartir con la comunidad?">
    //     <p>Visible para:</p>
    //     <input type="radio" name="public" value="public"> Público
    //     <input type="radio" name="friends" value="friends"> Sólo Amigos
    //     <br>
    //     <button>Publicar</button>
    // </article>
    // `;
}

function handleSignedOutUser() {
    location.hash = "#login";
}

