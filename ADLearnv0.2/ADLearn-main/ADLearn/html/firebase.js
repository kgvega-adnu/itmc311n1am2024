import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAvYRzyCrazIHj2-KHZ8UXuXfP2tVPIIZk",
    authDomain: "practicegeneral-ab18c.firebaseapp.com",
    projectId: "practicegeneral-ab18c",
    storageBucket: "practicegeneral-ab18c.appspot.com",
    messagingSenderId: "799394328558",
    appId: "1:799394328558:web:e72baf1faee2bcf14a68ff",
    measurementId: "G-1DMFZKG7WM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

// Signup Handler
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('pass').value;
        const username = document.getElementById('username').value;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save user details in Firestore
            await setDoc(doc(db, "users", user.uid), {
                username: username,
                email: email,
                createdAt: new Date().toISOString()
            });

            alert(`Account created successfully for ${username}`);
            window.location.href = "login.html"; // Redirect to login page
        } catch (error) {
            alert(`Signup failed: ${error.message}`);
        }
    });
}

// Login Handler
const loginForm = document.getElementById('login');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('pass').value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Retrieve user details from Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                alert(`Welcome back, ${userData.username}!`);
            } else {
                alert("Welcome back!");
            }
            window.location.href = "homepage.html"; // Redirect to homepage
        } catch (error) {
            alert(`Login failed: ${error.message}`);
        }
    });
}
