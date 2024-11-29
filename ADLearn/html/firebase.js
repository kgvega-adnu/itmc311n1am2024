import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";

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

document.addEventListener('DOMContentLoaded', () => {
    // Handle Signup
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('pass').value;

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    alert(`User signed up: ${user.email}`);
                    document.body.classList.add('fade-out');
                    setTimeout(() => {
                        window.location.href = 'homepage.html';
                    }, 500);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(`Error: ${errorCode}, ${errorMessage}`);
                });
        });
    }

    // Handle Login
    const loginForm = document.getElementById('login');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('pass').value;

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    alert(`Welcome back, ${user.email}`);
                    document.body.classList.add('fade-out');
                    setTimeout(() => {
                        window.location.href = 'homepage.html';
                    }, 500);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(`Login failed: ${errorCode}, ${errorMessage}`);
                });
        });
    }

    // Add page transition for navigation links
    const pageLinks = document.querySelectorAll('a');
    pageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = link.href;
            }, 500);
        });
    });
});