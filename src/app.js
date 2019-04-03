const contentDiv = document.getElementById("content"); 
firebase.initializeApp(config);

// Get elements
const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnLogin = document.getElementById("btnLogin");
const btnSignUp = document.getElementById("btnSignUp");
const btnLogOut = document.getElementById("btnLogOut");
const btnLogGoogle = document.getElementById ("btnLogGoogle");
const btnLogfacebook = document.getElementById ("btnLogfacebook");



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
    //console.log("DEBUG_MSG auth event");
    errorSection.style.display = "none";
    if (authEvent === "createuser") {
      createUser(email);
    }
  }).catch(function (error) {
    errorSection.style.display = "block";
    errorSection.innerHTML = codeMessageMapper(error.code);
    //console.log(error.message);
  });
}

btnLogin.addEventListener("click", function(event) {
  authEvent(txtEmail.value, txtPassword.value, firebase.auth(), "signin", errorDiv);
});

btnSignUp.addEventListener("click", function(event){
  authEvent(txtEmail.value, txtPassword.value, firebase.auth(), "createuser", errorDiv);
});


  // add log out event listener
  // logs out the user and refreshes window to #login
  btnLogOut.addEventListener("click", event => {
    firebase.auth().signOut();
    location.reload();
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
<<<<<<< HEAD

const signInGoogleBtn = document.getElementById('sign-in-google');
// Set GOOGLE as provider
let provider = new firebase.auth.GoogleAuthProvider();

//Get GOOGLE ACCOUNT Authentication FIREBASE DOCUMENTATION
const googleSignin = () => {
 firebase.auth().signInWithPopup(provider).then(function(result) {
 // This gives you a Google Access Token. You can use it to access the Google API.
 var token = result.credential.accessToken;
 // The signed-in user info.
 var user = result.user;
 // ...
 createUser(email);
}).catch(function(error) {
 // Handle Errors here.
 var errorCode = error.code;
 var errorMessage = error.message;
 // The email of the user's account used.
 var email = error.email;
 // The firebase.auth.AuthCredential type that was used.
 var credential = error.credential;
 // ...
});
}

signInGoogleBtn.addEventListener("click", googleSignin );


// // Navigate whenever the fragment identifier value changes.
// // TODO
// window.addEventListener("hashchange", router);
// window.addEventListener("load", router);
=======
  
// Navigate whenever the fragment identifier value changes.
//TODO
window.addEventListener("hashchange", router);
window.addEventListener("load", router);
//Facebook
document.getElementById("btnLogfacebook").addEventListener("click", function(){
    firebase.auth().signInWithPopup(window.data.providerFace).then((result) =>{
        window.data.sendDataFacebook(result.user);
        console.log(result.user);
        const photo = result.user.photoURL;
        const name = result.user.displayName;
        const email = result.user.email;
        
        showProfile(name, email, photo);
        return result.user;
    });

//Google
document.getElementById("btnLogGoogle").addEventListener("click", function(){
    firebase.auth().signInWithPopup(window.data.provider).then(function(result){
        window.data.sendDataGoogle(result.user);
        console.log(result.user);
        photo = result.user.photoURL;
        email = result.user.email;
         name = result.user.displayName;
        showProfile(name, email, photo);
    return result.user;
    });
});

});
>>>>>>> 2cfb7abf6fc7fcfd230411a23fda31bc065b3e8f
