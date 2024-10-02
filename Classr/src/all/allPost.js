//SIDEBAR
let btn = document.querySelector('#nav-btn');
let sidebar = document.querySelector('.sidebar');

btn.onclick = function () {
    sidebar.classList.toggle('active')
};

//PROFILE MENU
let subMenu = document.getElementById("subMenu");

function toggleMenu(){
    subMenu.classList.toggle("open-menu");
};

//Go to session
function goToPage(){
    window.location.href = 'recitBoard_HostPOV.html';
}