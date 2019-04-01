
firebase.initializeApp(config);

// Get elements
const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnLogin = document.getElementById("btnLogin");
const btnSignUp = document.getElementById("btnSignUp");
const btnLogOut = document.getElementById("btnLogOut");

const contentDiv = document.getElementById("content");

let errorDiv = document.getElementById("error");

/**
 * Function that maps firebase error code from firebase API
 * to a descriptive message of the error in spanish
 * @param {string} errorCode 
 */
function codeMessageMapper(errorCode){
  let message = "";
  switch(errorCode){
    case "auth/invalid-email":
      message = "Correo Electrónico inválido";
      break;
    case "auth/user-not-found":
      message = "Correo Electrónico no registrado";
      break;
    case "auth/wrong-password":
      message ="Contraseña incorrecta";
      break;
    case "auth/email-already-in-use":
      message = "Este correo eléctrónico ya está registrado, intenta con otro";
      break;
    case "auth/weak-password":
      message = "La contraseña debe tener al menos 6 caracteres";
      break;
    default:

  }

  return message;
}

/**
 * Wrapper for firebase authentication services.
 * @param {string} email 
 * @param {string} password 
 * @param {firebase auth service interface} object returned from firebase.auth() 
 * @param {string} authEvent signin or createuser 
 * @param {DOM element} errorSection DOM element where errors messages are shown
 */
function authEvent(email, password, auth, authEvent, errorSection) {

  let promise;

  if (authEvent === "signin") {
    promise = auth.signInWithEmailAndPassword(email, password);
  }
  else if (authEvent === "createuser") {
    promise = auth.createUserWithEmailAndPassword(email, password);
  }

  promise.then( function(){
    console.log("DEBUG_MSG auth event");
    errorSection.style.display = "none";
  }).catch(function (error) {
    errorSection.style.display = "block";

    errorSection.innerHTML = codeMessageMapper(error.code);
    console.log(error.message);
  });
}

btnLogin.addEventListener("click", function(event) {
  authEvent(txtEmail.value, txtPassword.value, firebase.auth(), "signin", errorDiv);
});

btnSignUp.addEventListener("click", function(event){
  authEvent(txtEmail.value, txtPassword.value, firebase.auth(), "createuser", errorDiv);
});


  // add log out event listener
  btnLogOut.addEventListener("click", event => {
    firebase.auth().signOut();
  });

 btnLoginGoogle.addEventListener("click", event => {
    firebase.auth().signin();
  });
// add realtime listener
/**
 * firebaseUser is an object with all information of a login user
 * if the user logs out or is not sign in then firebaseUser is null
 */
firebase.auth().onAuthStateChanged( function(firebaseUser) {
  // TODO create functions handleSignedInUser and handleSignedOutUser
  console.log("DEBUG_MSG: auth state change event");
  
  if (firebaseUser) {
    console.log(firebaseUser);
    btnLogOut.style.visibility = "visible";
    handleSignedInUser(firebaseUser);
  } else {
    console.log("not logged in");
    btnLogOut.style.visibility = "hidden";
    handleSignedOutUser();
  }
});
  

let loginGoogle = document.getElementById("loginGoogle");
// funcion para iniciar sesioon con Google
let providerg = new firebase.auth.GoogleAuthProvider();
loginGoogle.addEventListener("click", providerGoogle = () => {
  firebase.auth()
    .signInWithPopup(providerg)
    .then(function(result) {
      console.log(result.user);
      datosUsuario(result.user);
    });
  observador();
});


let loginFacebook = document.getElementById("loginFacebook");
// funcion para iniciar sesion con facebook
let providerf = new firebase.auth.FacebookAuthProvider();
loginFacebook.addEventListener('click', providerFacebook = () => {
  firebase.auth()
    .signInWithPopup(providerf)
    .then(function(result) {
      console.log(result.user);
      datosUsuario(result.user);
    });
  observador();
});


// Navigate whenever the fragment identifier value changes.
//TODO
window.addEventListener("hashchange", router);
window.addEventListener("load", router);
