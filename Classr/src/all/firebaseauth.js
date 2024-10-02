// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js"; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js"
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

function showMessage(message, divId){
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display="block";
  messageDiv.innerHTML=message;
  messageDiv.style.opacity=1;
  setTimeout(function(){
    messageDiv.style.opacity=0;
  }, 5000);
}

// Create Account
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
  event.preventDefault();
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('addEmail').value;
  const password = document.getElementById('addPassword').value;

  const auth = getAuth();
  const db = getFirestore();

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    const userData = {
      email: email,
      fullName: fullName,
    };
    showMessage('Account Created Successfully', 'signUpMessage');
    const docRef = doc(db, "users", user.uid);
    setDoc(docRef, userData)
    .then(() => {
      window.location.href='index.html';
    })
    .catch((error) => {
      console.error("error writing document", error);

    });
  })
  .catch((error) => {
    const errorCode = error.code;
    if (errorCode == 'auth/email-already-in-use'){
      showMessage('Oops! Email address already exists', 'signUpMessage');
    }
  })
});

//Login Account
const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    showMessage('Hello! Welcome to Classr.', 'signInMessage');
    const user = userCredential.user;
    localStorage.setItem('loggedInUserId', user.uid);
    setTimeout(function() {
      window.location.href='home.html';
    }, 900);
  })
  .catch((error) => {
    const errorCode = error.code;
    if (errorCode == 'auth/invalid-credential'){
      showMessage('Incorrect Email or Password', 'signInMessage');
    }
    else {
      showMessage('Error Logging in', 'signInMessage');
    }
  })
})