import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider,  signInWithPopup } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js"
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyAV7L0ZetJ0PzfExRLm71hrr9NBa_UHKbY",
    authDomain: "arck-co-little-trackie.firebaseapp.com",
    projectId: "arck-co-little-trackie",
    storageBucket: "arck-co-little-trackie.appspot.com",
    messagingSenderId: "786902861892",
    appId: "1:786902861892:web:5a7e98db05c43f6e7cd411"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.language = 'en';
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

function showMessage(message, divId) {
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function() {
        messageDiv.style.opacity=0;
    }, 5000);
}

// SIGN UP
const signUp=document.getElementById('submitSignUp');
signUp.addEventListener('click', (event)=> {
    event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    const firstname=document.getElementById('fName').value;
    const lastname=document.getElementById('lName').value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
            email: email,
            firstname: firstname,
            lastname: lastname
        };
        showMessage('Account Created Successfully!', 'signUpMessage');
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
        .then(() => {
            window.location.href='./LOGINPAGE/loginPage.html';
        })
        .catch ((error) => {
            console.error("error writing document", error);
        });
    })
    .catch ((error) => {
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use') {
            showMessage('Email Address Already Exists !!!', 'signUpMessage');
        }
        else 
        {
            showMessage('unable to Create User!', 'signUpMessage');
        }
    })
});

// SIGN IN
const signIn=document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
    event.preventDefault();
    const email=document.getElementById('Email').value;
    const password=document.getElementById('Password').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        showMessage('login is successful!', 'signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='./HOMEPAGE/homePage.html';
    })
    .catch((error) => {
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password!', 'signInMessage');
        }
        else
        {
            showMessage('Account does not Exist!', 'signInMessage');
        }
    });
});

// SIGN IN WITH GBOX
const googlelogin = document.getElementById('signInWithGbox');
googlelogin.addEventListener('click', function() {
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        console.log(user);
        window.location.href = '../HOMEPAGE/homePage.html';

    })
    .catch ((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
});
