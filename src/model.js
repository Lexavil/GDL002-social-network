let database = firebase.database();

firebase.auth().onAuthStateChanged(firebaseUser => {
  let user = firebase.auth().currentUser;
  if (user !== null) {
    user.updateProfile({
      displayName: user.displayName
    });
    document.getElementById("bienvenida").innerHTML = `Bienvenid@ ${user.displayName} <span class="caret"></span>`;
    document.getElementById("usuario-nombre").innerHTML = `${user.displayName}`;
    const userPhoto = user.photoURL;
    if (userPhoto) {
      document.getElementById("perfil-imagen").innerHTML = `<img src="${user.photoURL}" id="avatar">`;
    } else {
      document.getElementById("profile-imagen").innerHTML = `<img src="${"../assets/usuario.jpg"}" id="avatar">`;
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

// SHARE A NEW POST FUNCTION
// Get elements
const postText = document.getElementById('post-entry');
const btnShare = document.getElementById('new-post');
// Listen to button share
btnShare.addEventListener('click', event => {
  const currentUser = firebase.auth().currentUser;
  const textInPost = postText.value;
  if (textInPost.trim() === '') {
    alert('No ingresaste texto');
  } else {
    postText.value = '';
    // Create a unique key for messages collection
    const newPostKey = firebase.database().ref().child('posts').push().key;
    const date = (new Date).getTime();
    // Set the data for each post generated    
    firebase.database().ref(`posts/${newPostKey}`).set({
      creator: currentUser.uid,
      creatorName: currentUser.displayName,
      text: textInPost,
      likes: 0,
      postDate: date
    });
  };
});

// LOG-OUT FUNCTION
// Get elements
const btnLogout = document.getElementById('button-logout');

// Add logout event
btnLogout.addEventListener('click', event => {
  firebase.auth().signOut();
   location.hash = "#timeline";
});
