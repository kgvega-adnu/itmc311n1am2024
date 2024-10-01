const express = require('express');
const morgan = require('morgan');
require('dotenv').config();



const admin = require('firebase-admin');
const { CollectionGroup } = require('firebase-admin/firestore');
const e = require('express');

const app = express();
app.use(morgan('dev'));

app.use(express.static('static'));
app.use(express.json());

const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);


admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    // or use a service account key file: 
    credential: admin.credential.cert(serviceAccount)
  });


//db
  const db = admin.firestore();

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.listen(port, ()=>{
    console.log(`Connected to port:${port}`);
})


//temp

// const getDocumentFields = async () => {
//   try {
//     const docRef = db.collection('subjects');


//     const doc = await docRef.get();

//     doc.forEach(e => {
//       datas = e.data();
//         if(datas.collegeList.includes('BSIT')){
//           console.log(datas);
          
//         }

//     })


//     if (!doc.exists) {
//       console.log('No such document!');
//       return;
//     }

//     const data = doc.data();
//     console.log('Document data:', data);

//   } catch (error) {
//     console.error('Error getting document', error);
//   }
// };

// getDocumentFields();


//role assigning
const adminsUID = ["wNSYvRJIYJYBy09yuYnOZZ98gss2"];

const assignRole = async (uid) =>{
  if(adminsUID.includes(uid)){
    try{
      await admin.auth().setCustomUserClaims(uid, { role: 'admin' })
      console.log("Succesfully assigned admin role!");
    }catch(err){
      console.log("Error assigning admin role");
    }
  }else{
    try{
      await admin.auth().setCustomUserClaims(uid, {role: 'user'})
      console.log("Succesfully assigned user role!");
    }catch(err){
      console.log("Error assigning default role");
    }
  }
} 


//handle REGISTRATION
app.post('/reg', async(req,res)=>{
    data = req.body;

    if(data.password != data.confirmPassword){
      res.status(500).json({
        message: 'Error creating user',
        error: "Both passwords must be the same.",
        status: 'error'
      })
      return;
    }

    try {
        // Create user in Firebase Authentication
        const userRecord = await admin.auth().createUser({
          email: data.email,
          password: data.password
        });


        assignRole(userRecord.uid);

    
        res.status(201).json({
          message: 'User created successfully',
          user: userRecord,
          status: 'passed',
          redirect: '/'
        });
      } catch (error) {

 

        res.status(500).json({
          message: 'Error creating user',
          error: error.message,
          status: 'error'
        });
      }

})



//middleware for tokens
const verifyToken = async (req,res,next)=>{
  const token =req.body.token;
  if(!token){
    return res.status(401).json({message:"No Tokens"})
  }

  try{
    const decodedToken = await admin.auth().verifyIdToken(token);

    req.body = {...req.body,
      ...decodedToken

    };
    next();
  }catch(err){
    console.log(err);
    return res.status(401).json({message: err.message})
  }
}


//handle LOGINS
app.post('/login',verifyToken,async(req,res)=>{
  res.status(200).json({message: "Account Authenticated", account: req.body.role, redirect: 'departments'})
})

app.get('/protected',verifyToken, (req,res)=>{
  res.status(200).json({message: "Authorized person only"});
})

// app.get('/protected', verifyToken, (req,res)=>{
// })



app.get('/', (req,res)=>{
    res.render('index', {pageTitle:'Home' });
})

app.get('/homepage', (req,res) => {
  res.render('homepage', {pageTitle:'Home'})
})



//for departments
app.get('/departments', async(req,res)=>{

    const departmentsData = await db.collection('departments').get();
    res.render('departments', {pageTitle: 'Departments', departmentsData });
})


//For courses
app.get('/departments/:id', async(req,res)=>{
  const id = req.params.id; 

  try{
    const collegeData = await db.collection('departments').doc(id).collection('colleges').get();
    const deptName = await db.collection('departments').get();

    res.render('colleges', {pageTitle: 'Colleges', collegeData, deptID : id, deptName});
  }catch(err){
    console.log("Error getting the data", err);
  }
})

//for Colleges
app.get('/departments/:id1/:id2', async(req,res)=>{
  const id1 = req.params.id1; 
  const id2 = req.params.id2;
  try{

    const ids = {id1,id2};

    console.log(ids.id1);


    const docSnap = await db.collection('departments').doc(id1).collection('colleges').doc(id2).get();

    const collegeTitle = docSnap.data().collegeTitle;

    const subjects = await db.collection('subjects').get();

    res.render('course', {pageTitle: 'Course', collegeTitle: collegeTitle,ids , subjects: subjects})

  }catch(err){
    console.log("Error getting the data", err);
  }
})

let ctr = 1;
//for subjects
app.get('/departments/:id1/:id2/:id3', async(req,res)=>{
  console.log(`Number of ${ctr} summons`);
  ctr++;
  const id1 = req.params.id1; 
  const id2 = req.params.id2;
  const id3 = req.params.id3;
  try{
    const ids = {id1,id2,id3};

    let subject = await db.collection('subjects').doc(id3).get();

    subject = subject.data();

    const reviews = await db.collection('subjects').doc(id3).collection('reviews').get();

    reviews.forEach(e => {
        console.log(e.data().username);
    });


    res.render('subject', {pageTitle: 'Subject', ids, subject, reviews })

  }catch(err){
    console.log("Error getting the data", err);
  }
})

app.post('/reviews', verifyToken, async(req,res)=>{
  console.log(req.body.course);
  const course = req.body.course;

  
  let segments = req.body.email.split('@').filter(Boolean);
  let username = segments[0].split('');

  for(let i = 0 ; i < username.length; i++){
    if(i>0 && i < (username.length-1)){
      username[i]  = '*';
    }
  }
  username = username.join('');

  const ratings = {
    comment: req.body.comment,  
    rating: parseInt(req.body.rating, 10),  // Converts string to integer (base 10)
    userId: req.body.uid,
    username: username,             
    timestamp: admin.firestore.FieldValue.serverTimestamp()  
};

try{
  const docSnap = await db.collection('subjects').doc(course).collection('reviews').doc(`ratings${ratings.userId}`).set(ratings)
  .then(console.log("Added the rating succesfully"))

  res.status(201).json({message: "Reviewed Succesfully"});
}catch(err){
console.log("Error adding the rating", err);
res.status(400).json({message: "Error Occured", error: err});

}

})

app.use('/', (req,res)=>{


    res.render('404', {pageTitle: '404'});
})