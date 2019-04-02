function router() {
    if(firebase.auth().currentUser) {
        location.hash = "#timeline"
    }
    else{
        location.hash = "#login";
    }
}

