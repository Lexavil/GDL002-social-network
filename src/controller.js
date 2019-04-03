
//import { timeLineTemplate } from './templates/timelineTemplate';

const USERS_COLLECTION = "users_tests_monse";


function CreatePost(mail, textval, isPublic) {
    //TODO make a function to return current date
    return {
        email:mail,
        text: textval,
        is_public: isPublic,
        date : "30/03/2019"
    };
}

function handleSignedInUser(firebaseUser) {
    location.hash = "#timeline";

    let userEmail = firebaseUser.email; 

    let timeLineTemplate = timelineTemplate();
    // modifies timeline
    contentDiv.innerHTML = timeLineTemplate;

    let db = firebase.firestore();
    let testDb= document.getElementById("test-db");
    document.getElementById("button-post").addEventListener("click", function () {
        let post = document.getElementById("input-post").value;
        if (post.length >0) {
            //TODO: extract if post is public or not from radio box
            
            db.collection(`${USERS_COLLECTION}/user_${userEmail}/myPosts/`).add(CreatePost(userEmail, post, true))
            .then (function (docRef){
                testDb.innerHTML= docRef.id })
                // .cath (function (error){
                //     console.error ("Error del post:", error.code);
                    
                // });
        }
        else{
            // TODO show message that post is empty
        }
    });
}


function handleSignedOutUser() {
    location.hash = "#login";
}

<<<<<<< HEAD
function createUser(email) {
let db = firebase.firestore();
    let usersRef = db.collection(USERS_COLLECTION);
    usersRef.doc(`user_${email}`).set({email: email});
}
=======
>>>>>>> 2cfb7abf6fc7fcfd230411a23fda31bc065b3e8f
