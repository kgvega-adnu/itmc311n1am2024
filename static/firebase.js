import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, onAuthStateChanged,
   signOut  } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, addDoc  } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB0niTxx_m8nXbtgIX4ge_YTssyoTr7-88",
  authDomain: "repa-corporation.firebaseapp.com",
  projectId: "repa-corporation",
  storageBucket: "repa-corporation.appspot.com",
  messagingSenderId: "1091853088098",
  appId: "1:1091853088098:web:f852af6d7e5c07e059283b",
  measurementId: "G-NZ06DH4BT7"
};

// Providers
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);
auth.languageCode = 'en';
//--------



//login and reg

// const submitBTN = document.getElementById('submitBTN');


// submitBTN.addEventListener('click', (e) =>{

//     //getting the data
//     let email = document.getElementById('email').value;
//     let password = document.getElementById('password').value;
//     const confirmPassword = document.getElementById('confirmPassword').value;
//     const username = document.getElementById('username').value;

//     if(!(password == confirmPassword)){
//         alert("Password is not the same!");
//       return
//     }

//     const phoneNumber = document.getElementById('phoneNumber').value;
//     const departmentDropdown = document.getElementById('departmentDropdown').value;
//     const courseDropdown = document.getElementById('courseDropdown').value;
//     //---

//     createUserWithEmailAndPassword  (auth, email, password)
//     .then((userCredential) => {
//         alert("Registered succesfully");
//         window.location.href='/';

//         // Signed up 
//         //add data for firestore

//         addUser({
//           email: email,
//           username: username,
//           phonenumber: phoneNumber,
//           department: departmentDropdown,
//           course: courseDropdown,
//         })
         

//         const user = userCredential.user;

//         console.log(user);
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;

//         if (errorCode === 'auth/email-already-in-use') {
//             alert("Email already exists!");
//         } else {
//             alert(`Error: ${errorMessage}`);
//         }
//         // ..
//     });

// })




//login
try{
  const log = document.getElementById('log').addEventListener('submit', async (e)=>{
    e.preventDefault();

    const email = document.getElementById('Lemail').value;
     const password = document.getElementById('Lpassword').value;
  
     if(password.length == 0){
      alert("Password missing please try again");
      return;
     }
  
      console.log(email, password);
     signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) =>  {
      // Signed in 
      const user = userCredential.user; 
      const token =  await user.getIdToken();
      

      await  fetch('/login', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({token:token})
        })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          window.location.href= res.redirect;
        })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
  
      if(errorCode === 'auth/invalid-login-credentials'){
          alert(errorMessage)
      }else{
          if(errorCode === 'auth/invalid-email'){
            alert("Invalid Email pulease try again");
          }else{
            alert(errorMessage);
          }
      }
      
    });
  })
}catch(err){
  console.log(err);
}



try{
  onAuthStateChanged(auth, async(user) => {
    if (user) {
        // User is signed in, you can get their details
        const uid = user.uid;
      const token = await user.getIdToken(true);  // Wait for token to be ready
        const path =  window.location.href;

      try{
        fetch(path, {
          method:'GET',
          headers: {
            'authorization': `Bearer ${token}`,  // Send the token in the headers
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json)
        .then(console.log('GET FETCHED SUCCESSFULLY'))
      }catch(err){
        console.log('Error in fetch', err);
      }
    
        //temp
  const namehere = document.getElementById('namehere').innerHTML = user.email ;
    } else {
        // No user is signed in
        console.log("No user is signed in.");
    }
});
}catch(err){
  console.log("error in Auth", err);
}

 

//Memory persistence




const logout = document.getElementById('signOut');

logout.addEventListener('click', (e) =>{
    window.location.href='/';
    signOut(auth).then(() => {
      alert("SIGNED OUT")
    }).catch((error) => {
      // An error happened.
      console.log(err);
    });
})


try{
  const modal = document.getElementById('ratingModal').addEventListener('submit', (e)=>{
    e.preventDefault();
    const comment = document.getElementById('reviewTXT').value;

    onAuthStateChanged(auth, (user) => {
      if (user) {
          // User is signed in, you can get their details
          const uid = user.uid;
          const token = user.accessToken;

          const path = window.location.pathname;


          const segments = path.split('/').filter(Boolean);
          const course = segments[3]; 
          console.log(course);

          const reviewData = {rating,comment,token,course}

          console.log(reviewData);


          fetch('/reviews', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
          })
          .then(res => res.json())
          .then(res => {
            window.location.reload();
          })
      } else {
          // No user is signed in
          console.log("No user is signed in.");
      }
  });


})
}catch(err){
  console.log('Error in subjects ejs -- fetching data', err);
}


//for departments
try{
  const path = window.location.pathname;
  console.log(path);
  const home = document.getElementById('sideHome');
  const sideDept = document.getElementById('sideDept');


  if(path == '/homepage'){
    home.style.backgroundColor= '#29398C';
    home.style.borderRadius= '10px';
    home.style.color= 'white';

    
  }else{
    sideDept.style.backgroundColor= '#29398C';
    sideDept.style.borderRadius= '10px';
    sideDept.style.color= 'white';

  }
}catch(err){

}
