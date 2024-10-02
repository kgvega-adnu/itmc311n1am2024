// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js"; 
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, collection, query, orderBy, limit, getDoc, getDocs, addDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
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

//Collection Ref
const sessionsRef = collection(db, 'sessions');

//Create Session
//Create Session - Get email
const getEmail = localStorage.getItem('loggedInUserId');
let hostEmail, hostName;
if(getEmail){
    const emailRef = doc(db, "users", getEmail);
    getDoc(emailRef)
    .then((docSnap)=>{
        if(docSnap.exists()){
            const hostData = docSnap.data();
            hostEmail = hostData.email;
            hostName = hostData.fullName;
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

//Create Session - Get Form
const createSession = document.querySelector('.create-session-form')

createSession.addEventListener('submit', (event) => {
    event.preventDefault()

    addDoc (sessionsRef, {
        // sessionCode: createSession.sessionCode.value,
        sessionName: createSession.sessionName.value,
        hostName: hostName, 
        hostEmail: hostEmail,
        dateCreated: serverTimestamp(),
        role: 'host',
    })
    .then(() => {
        createSession.reset();
        window.location.href='home.html';
    })
})






