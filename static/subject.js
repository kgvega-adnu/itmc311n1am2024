
const rateBox = document.getElementById('rate-box');
const modal = document.getElementById('ratingModal');
const closeModal = document.querySelector('.close');
const closeIn = document.getElementById('closeIn');

closeIn.addEventListener('click', () => {
    modal.style.display = 'none';
});

rateBox.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
let rating = 5;
// Handle rating change

document.querySelectorAll('.star-rating input').forEach(input => {
    input.addEventListener('change', (e) => {
        const emoticons = document.getElementById('emoticons');
        
        rating = e.target.value;
        console.log(`User rated: ${rating} stars`);
        switch(rating){
            case '1': emoticons.innerHTML = "Very Unsatisfied😡<img style='height: 30%;width: 30%;' src='/images/pat2.png'>"; 
            break;
            case '2' : emoticons.innerHTML = "Unsatisfied😔 <img style='height: 30%;width: 30%;' src='/images/ana.png'>"
            break;
            case '3' : emoticons.innerHTML = "Neutral😐 <img style='height: 60%;width: 60%;' src='/images/ana2.png'>"
            break;
            case '4' : emoticons.innerHTML = "Satisfied😆<img style='height: 30%;width: 30%;' src='/images/pat.png'>"
            break;
            case '5' : emoticons.innerHTML = "Very Satisfied <img style='height: 60%;width: 60%;' src='/images/isa.png'>"
            break;
        }
    });
});

const textarea = document.getElementById('reviewTXT');
const charCount = document.getElementById('charCount');

textarea.addEventListener('input', () => {
    charCount.textContent = textarea.value.length;
    if(charCount.textContent < 10 || charCount.textContent== 1000){
        charCount.style.color = 'red';
    }else{
        charCount.style.color = 'black';            

    }

});

let a= 0 ;
a++;
console.log('aaa', a);
