window.data = {
    provider: new firebase.auth.GoogleAuthProvider(),
    providerFace: new firebase.auth.FacebookAuthProvider(),
    config: {
         apiKey: "AIzaSyAG-k8sfR7HI-GHNFHv5mQlfb4Bu8zvJIY",
    authDomain: "social-network-a702c.firebaseapp.com",
    databaseURL: "https://social-network-a702c.firebaseio.com",
    projectId: "social-network-a702c",
    storageBucket: "social-network-a702c.appspot.com",
    messagingSenderId: "99341463255"
    },

    saveData: ( name, email) =>{
        let user = {
            name: name,
            email: email ,
            photo: "../assets/perfil.png",
            post: "null",
        }
        firebase.database().ref("users/" + uid)
        .set(user);
        // firebase.database().collection("users/" + user.uid +  "Post/").add({
        //     Contenido: "Hola",
        //     Fecha: 29/03/2019
        // });
    },

    sendDataGoogle: (user) =>{
        const users = {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            post: "null",
        }
        firebase.database().ref("users/" + user.uid)
        .set(users);
    }
};