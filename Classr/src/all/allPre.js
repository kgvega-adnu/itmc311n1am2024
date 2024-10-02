// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js"; 
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, collection, getDoc, addDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9Z3zE5eRU3eCZCMl-h6LmB0fr84p9s0I",
  authDomain: "classr-49b17.firebaseapp.com",
  projectId: "classr-49b17",
  storageBucket: "classr-49b17.appspot.com",
  messagingSenderId: "91395202268",
  appId: "1:91395202268:web:a7787f5d1d6fa619a5e819"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

//Get User First Name and Last Name
onAuthStateChanged(auth, (user) => {
const loggedInUserId=localStorage.getItem('loggedInUserId');
if(loggedInUserId){
    const docRef = doc(db, "users", loggedInUserId);
    getDoc(docRef)
    .then((docSnap)=>{
        if(docSnap.exists()){
            const userData = docSnap.data();
            document.getElementById('navFullName').innerText=userData.fullName;
            document.getElementById('userFullName').innerText=userData.fullName;
            document.getElementById('userEmail').innerText=userData.email;
        }
        else{
            console.log("no document found matching id")
        }
    })
    .catch((error)=>{
        console.log(error);
    })
}
else{
    console.log("User Id not Found in Local storage")
}
})

//Log Out User
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
localStorage.removeItem('loggedInUserId');
signOut(auth)
.then(() => {
    window.location.href='index.html';
})
.catch((error) => {
    console.error('Error signing out', error)
})
})
