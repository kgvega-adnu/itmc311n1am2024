// Open the form when clicking "Create"
document.getElementById("openForm").addEventListener("click", function() {
    document.getElementById("classroomForm").classList.add("show");
    document.getElementById("overlay").classList.add("show");
});

// Close the form when clicking the close button
document.getElementById("closeForm").addEventListener("click", function() {
    document.getElementById("classroomForm").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
});

// Hide form and overlay if user clicks outside of the form
document.getElementById("overlay").addEventListener("click", function() {
    document.getElementById("classroomForm").classList.remove("show");
    document.getElementById("overlay").classList.remove("show");
});


// Adding Classroom to Database

const firebaseConfig = {
    apiKey: "AIzaSyAV7L0ZetJ0PzfExRLm71hrr9NBa_UHKbY",
    authDomain: "arck-co-little-trackie.firebaseapp.com",
    projectId: "arck-co-little-trackie",
    storageBucket: "arck-co-little-trackie.appspot.com",
    messagingSenderId: "786902861892",
    appId: "1:786902861892:web:5a7e98db05c43f6e7cd411"
};

// Initialize Firebase with the configuration object
firebase.initializeApp(firebaseConfig);

// Reference to the Firestore database
const db = firebase.firestore();
const classroomFormDB = db.collection("Classrooms");

// Handle form submission for adding a classroom
document.getElementById('classroomAddForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

// Get input values from the form fields

    const preSchool = document.getElementById('preSchool').value;
    const sectionName = document.getElementById('sectionName').value;
    const schedule = document.getElementById('schedule').value;

// Check if all fields are filled out
    if(preSchool && sectionName && schedule) {
        saveMessages(preSchool, sectionName, schedule);
    }
    else
    {
        alert("Please fill out all fields!");
    }
}
// Save classroom data to the Firestore database
const saveMessages = (preSchool, sectionName, schedule) => {
    classroomFormDB.add({
        preSchool: preSchool,
        sectionName: sectionName,
        schedule: schedule
    })
    .then (() => {
        alert("Classroom added successfully!");    // Show success message and close form

        document.getElementById('classroomForm').classList.remove("show");
        document.getElementById("overlay").classList.remove("show");
        document.getElementById('classroomAddForm').reset();
        displayClassrooms();
    })
    .catch ((error) => {
        alert("Error adding classroom. Please try again.");   // Show an error message if adding fails
    });  
};
// Display the list of classrooms
function displayClassrooms() {
    const container = document.getElementById('classroomList');
    container.innerHTML = '';
    console.log('Displaying classroos...');

// Fetch all classroom documents from Firestore
    classroomFormDB.get().then((snapshot) => {
        console.log('Snapshot:', snapshot);
        if (snapshot.empty) {                   // Check if there are any classrooms
            console.log('No matching document.');
        }
        snapshot.forEach((doc) => {
            const data = doc.data();
            const docId = doc.id;
            console.log('Document data:', data);
            const classroomElement = document.createElement('div');
            classroomElement.className = 'red-BG-Board';

// Set wallpaper based on the preSchool value
            let wallpaperSrc = '';
            if (data.preSchool === 'Nursery 1'){
                wallpaperSrc = '/assets/greenwallpaper.png';
            } else if (data.preSchool === 'Nursery 2') {
                wallpaperSrc = '/assets/bluewallpaper.png';
            } else if (data.preSchool === 'Kinder') {
                wallpaperSrc = '/assets/pinkwallpaper.png';
            }

// Set the inner HTML
            classroomElement.innerHTML = `
                <img class="pinkwall" src="${wallpaperSrc}">
                <p class="class-textTop"><strong>Level:</strong> ${data.preSchool}</p>
                <p class="class-text"><strong>Section:</strong> ${data.sectionName}</p>
                <p class="class-textLast"><strong>Schedule:</strong> ${data.schedule}</p>
                <button class="delete-btn" onclick="deleteClassroom('${docId}')">
                    <img src="/assets/DeleteBtn.png" alt="Delete" />
                </button>
            `;
            container.appendChild(classroomElement);            
        });
    });
}

// Delete a classroom by its ID
function deleteClassroom(id) {
    console.log("Deleting document with ID: ", id); // Debugging log

    if (confirm("Are you sure you want to delete this classroom?")) {
        classroomFormDB.doc(id).delete().then(() => {
            alert("Classroom deleted successfully!");
            displayClassrooms(); // Refresh the classroom list
        }).catch((error) => {
            console.error("Error removing classroom: ", error);
            alert("Error removing classroom. Please try again.");
        });
    }
}
// Display classrooms when the page loads
window.onload = displayClassrooms;