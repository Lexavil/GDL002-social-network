let database = firebase.database();

firebase.auth().onAuthStateChanged(firebaseUser => {
  let user = firebase.auth().currentUser;
  if (user !== null) {
    user.updateProfile({
      displayName: user.displayName
    });
    //se guardan los datos del ususario 
    document.getElementById("bienvenida").innerHTML = `Bienvenidx ${user.displayName} <span class="caret"></span>`;
    document.getElementById("usuario-nombre").innerHTML = `${user.displayName}`;
    const userPhoto = user.photoURL;
    if (userPhoto) {
      document.getElementById("perfil-imagen").innerHTML = `<img src="${user.photoURL}" id="avatar">`;
    } else {
      document.getElementById("perfil-imagen").innerHTML = `<img src="${"../assets/perfil.png"}" id="avatar">`;
    }
    document.getElementById("usuario-email").innerHTML = `${user.email}`;
  } else {
    console.log('not logged in');
  }
  let id = user.uid;
  userConect = database.ref('users/' + id);
  addUser(user.displayName, user.email, user.photoURL);
});

addUser = (name, email, photo) => {
  let conect = userConect.push({
    name: name,
    email: email,
    photo: photo
  });
};
//se muestra la inf del perfil
const showProfile = (name, email, photo) =>{
    document.getElementById("profile").innerHTML = ` <img  src="${photo}"> 
    ${name}
    ${email}`;
};



// sal dar click te llevara a pantalla de inicio
btnLogout.addEventListener('click', event => {
  firebase.auth().signOut();
   location.hash = "#login";
});
