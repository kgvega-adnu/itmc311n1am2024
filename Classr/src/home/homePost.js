//CREATE SESSION POPUP
const openCreate = document.getElementById('open-create-session');
const createContainer = document.getElementById('create-container');
const closeCreate = document.getElementById('cancel-create-session');

openCreate.addEventListener('click', () => {
    createContainer.classList.add('show');
})

closeCreate.addEventListener('click', () => {
    event.preventDefault();
    createContainer.classList.remove('show');
    document.getElementById('create-session-form').reset();
})

document.getElementById('create-session-form').addEventListener('keydown', function(event){
    if (event.key === 'Enter') {
        event.preventDefault();
    }
})

//JOIN SESSION POPUP
const openJoin = document.getElementById('open-join-session');
const joinContainer = document.getElementById('join-container');
const closeJoin = document.getElementById('cancel-join-session');

openJoin.addEventListener('click', () => {
    joinContainer.classList.add('showJoin');
})

closeJoin.addEventListener('click', () => {
    event.preventDefault();
    joinContainer.classList.remove('showJoin');
    document.getElementById('join-session-form').reset();
})

document.getElementById('join-session-form').addEventListener('keydown', function(event){
    if (event.key === 'Enter'){
        event.preventDefault();
    }
})

//GENERATE UID
// function generate(){
//     var input = document.getElementById('sessionCode');
//     var sessionUID = new Date().getTime().toString();
//     var generateUID = sessionUID;
//     input.value = generateUID;
// }

//CLEAR CREATE SESSION INPUT
function clear(){
    document.getElementById('cancel-create-session').value='';
}

//COPY UID
// const copyButton = document.getElementById('copy-btn');
// const inputField = document.getElementById('sessionCode');

// copyButton.addEventListener('click', () => {
//     navigator.clipboard.writeText(inputField.value)
//     .then(() => {
//         alert('Copied to clipboard');
//     })
//     .catch(err => {
//         console.error(err);
//     });
// });