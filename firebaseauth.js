// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
import {getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js" 
import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABauRWzhuYapQWIgXjONEQQT_NJHf89JM",
  authDomain: "curivo-4ed20.firebaseapp.com",
  projectId: "curivo-4ed20",
  storageBucket: "curivo-4ed20.firebasestorage.app",
  messagingSenderId: "214845219672",
  appId: "1:214845219672:web:4a04c7b2dcc365e2f0bb2d",
  measurementId: "G-Y8YJ720K4J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// Sign Up
document.getElementById('submitSignUp').addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return setDoc(doc(db, "users", user.uid), { email, firstName, lastName });
        })
        .then(() => {
            showMessage('Account Created Successfully', 'signUpMessage');
            window.location.href = 'login.html';
        })
        .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                showMessage('Email Address Already Exists!', 'signUpMessage');
            } else if (error.code === 'auth/weak-password') {
                showMessage('Password should be at least 6 characters!', 'signUpMessage');
            } else {
                showMessage('Unable to create user: ' + error.message, 'signUpMessage');
            }
        });
});

// Sign In
document.getElementById('submitSignIn').addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            showMessage('Login successful!', 'signInMessage');
            localStorage.setItem('loggedInUserId', user.uid);
            window.location.href = 'index.html';
        })
        .catch((error) => {
            if (error.code === 'auth/invalid-credential') {
                showMessage('Incorrect Email or Password', 'signInMessage');
            } else {
                showMessage('Account does not exist: ' + error.message, 'signInMessage');
            }
        });
});
