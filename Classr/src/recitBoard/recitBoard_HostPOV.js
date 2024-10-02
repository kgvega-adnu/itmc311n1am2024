//SIDEBAR
let btn = document.querySelector('#nav-btn')
    let sidebar = document.querySelector('.sidebar')

btn.onclick = function () {
    sidebar.classList.toggle('active')
};

//PROFILE MENU
let subMenu = document.getElementById("subMenu");

function toggleMenu(){
    subMenu.classList.toggle("open-menu");
};

// SESSION NAVIGATION BUTTON
document.addEventListener('DOMContentLoaded', function () {
    let recitBoardBtn = document.getElementById('recitBoardBtn');
    let membersBtn = document.getElementById('membersBtn');
    let groupsBtn = document.getElementById('groupsBtn');
    let leaderboardBtn = document.getElementById('leaderboardBtn');
    let backBtn = document.getElementById('backBtn');

    const navLinks = document.querySelectorAll('.session-nav .nav-link');

    recitBoardBtn.addEventListener('click', function () {
        window.location.href = '../pages/recitBoard_HostPOV.html';
    });

    membersBtn.addEventListener('click', function () {
        window.location.href = '../pages/members_HostPOV.html';
    });

    groupsBtn.addEventListener('click', function () {
        window.location.href = '../pages/groups_HostPOV.html';
    });

    leaderboardBtn.addEventListener('click', function () {
        window.location.href = '../pages/leaderboard_HostPOV.html';
    });

    backBtn.addEventListener('click', function () {
        window.history.back();
    });
});



// SORT BUTTON
let mostPointsBtn = document.getElementById('mostPointsBtn');
let leastPointsBtn = document.getElementById('leastPointsBtn');

// RECITATION MODE BUTTON
let individualModeBtn = document.getElementById('individualModeBtn');
let groupModeBtn = document.getElementById('groupModeBtn');

// Sort membersList
mostPointsBtn.addEventListener('click', function() {
    mostPointsBtn.classList.add('active');
    leastPointsBtn.classList.remove('active');
    sortMembersList('mostPoints'); 
});

leastPointsBtn.addEventListener('click', function() {
    leastPointsBtn.classList.add('active');
    mostPointsBtn.classList.remove('active');
    sortMembersList('leastPoints'); 
});

individualModeBtn.addEventListener('click', function() {
    individualModeBtn.classList.add('active');
    groupModeBtn.classList.remove('active');
    toggleRecitationMode('individual'); 
});

groupModeBtn.addEventListener('click', function() {
    groupModeBtn.classList.add('active');
    individualModeBtn.classList.remove('active');
    toggleRecitationMode('group'); 
});

// Sorting function
function sortMembersList(order) {
    if (order === 'mostPoints') {
        // Logic to sort by most points
    } else if (order === 'leastPoints') {
        // Logic to sort by least points
    }
}

// Toggle function for recitation mode
function toggleRecitationMode(mode) {
    if (mode === 'individual') {
        // Logic for individual mode
    } else if (mode === 'group') {
        // Logic for group mode
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const individualModeBtn = document.getElementById("individualModeBtn");
    const groupModeBtn = document.getElementById("groupModeBtn");
    const membersListContainer = document.getElementById("membersListContainer");
    const groupsListContainer = document.getElementById("groupsListContainer");


    function hideAllContainers() {
        membersListContainer.style.display = "none";
        groupsListContainer.style.display = "none";
    }

    hideAllContainers();
    membersListContainer.style.display = "block";


    individualModeBtn.addEventListener("click", function() {
        hideAllContainers();
        membersListContainer.style.display = "block"; 
    });

    groupModeBtn.addEventListener("click", function() {
        hideAllContainers();
        groupsListContainer.style.display = "block";
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const mostPointsBtn = document.getElementById('mostPointsBtn');
    const leastPointsBtn = document.getElementById('leastPointsBtn');
    const individualModeBtn = document.getElementById('individualModeBtn');
    const membersList = document.getElementById('membersList');
    
    const sortMembers = (sortOrder) => {
        let rows = Array.from(membersList.querySelectorAll('.member-row'));
        rows.sort((a, b) => {
            const pointsA = parseInt(a.querySelector('.member-points').dataset.points);
            const pointsB = parseInt(b.querySelector('.member-points').dataset.points);
            return sortOrder === 'asc' ? pointsA - pointsB : pointsB - pointsA;
        });
        rows.forEach(row => membersList.appendChild(row));  
    };

    mostPointsBtn.addEventListener('click', () => {
        sortMembers('desc');  
        mostPointsBtn.classList.add('active');
        leastPointsBtn.classList.remove('active');
    });

    leastPointsBtn.addEventListener('click', () => {
        sortMembers('asc');  
        leastPointsBtn.classList.add('active');
        mostPointsBtn.classList.remove('active');
    });

    individualModeBtn.addEventListener('click', () => {

    });
});

document.addEventListener("DOMContentLoaded", () => {
    const mostPointsBtn = document.getElementById('mostPointsBtn');
    const leastPointsBtn = document.getElementById('leastPointsBtn');
    const groupModeBtn = document.getElementById('groupModeBtn');
    const groupsList = document.getElementById('groupsList');
    
    const sortGroups = (sortOrder) => {
        let rows = Array.from(groupsList.querySelectorAll('.group-row'));
        rows.sort((a, b) => {
            const pointsA = parseInt(a.querySelector('.group-points').dataset.points);
            const pointsB = parseInt(b.querySelector('.group-points').dataset.points);
            return sortOrder === 'asc' ? pointsA - pointsB : pointsB - pointsA;
        });
        rows.forEach(row => groupsList.appendChild(row));  
    };

    mostPointsBtn.addEventListener('click', () => {
        sortGroups('desc');  
        mostPointsBtn.classList.add('active');
        leastPointsBtn.classList.remove('active');
    });

    leastPointsBtn.addEventListener('click', () => {
        sortGroups('asc');  
        leastPointsBtn.classList.add('active');
        mostPointsBtn.classList.remove('active');
    });

    groupModeBtn.addEventListener('click', () => {

    });
});
