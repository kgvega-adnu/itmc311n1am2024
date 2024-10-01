

document.addEventListener('DOMContentLoaded', () => {
  const departmentDropdown = document.getElementById('departmentDropdown');
  const courseDropdown = document.getElementById('courseDropdown');

  // Define course options for each department
  const departmentCourses = {
    'business': ['Bachelor of Business Administration (BBA)', 'Master of Business Administration (MBA)', 'Bachelor of Commerce (BCom)'],
    'comstud': ['Bachelor of Science in Computer Science (BSCS)', 'Bachelor of Science in Information Technology (BSIT)', 'Bachelor of Science in Electronics and Communications Engineering (BSECE)'],
    'educ': ['Bachelor of Education (BEd)', 'Master of Arts in Education (MAEd)', 'Master of Science in Education (MScEd)'],
    'nursing': ['Bachelor of Science in Nursing (BSN)'],
    'humms': ['Bachelor of Arts in Humanities (BA Humanities)'],
    'archi': ['Bachelor of Science in Architecture (BS Arch)']
};
  departmentDropdown.addEventListener('change', () => {
      const selectedDepartment = departmentDropdown.value;
      
      // Clear existing courses
      courseDropdown.innerHTML = '';

      if (departmentCourses[selectedDepartment]) {
          // Show and populate courses
          courseDropdown.style.display = 'block';
          
          departmentCourses[selectedDepartment].forEach(course => {
              const option = document.createElement('option');
              option.value = course;
              option.textContent = course;
              courseDropdown.appendChild(option);
          });
      } else {
          // Hide courses if no department is selected
          courseDropdown.style.display = 'none';
      }
  });
});

document.getElementById('registerBox').style.display = 'none';
document.getElementById('loginBox').style.display = 'block';

const loghere = document.getElementById('loghere');
const reghere = document.getElementById('reghere');

reghere.addEventListener('click', (e) => {
    document.getElementById('registerBox').style.display = 'block';
    document.getElementById('loginBox').style.display = 'none';
});

loghere.addEventListener('click', (e) => {
    document.getElementById('registerBox').style.display = 'none';
    document.getElementById('loginBox').style.display = 'block';
});




//register
function alertBox(data){
    const alertBox = document.getElementById('alertBox');
    console.log("HIIHI; ", data.status, data.status == 'error');

    if(data.status == 'error'){
        console.log("hello");
        alertBox.style.display='block';
        alertBox.innerHTML = data.error;

    }else{
        alertBox.style.display='block';
        alertBox.innerHTML = data.message;
        alertBox.style.backgroundColor ='#cefad0'
        alertBox.style.color ='#00631'
        alertBox.style.border = 'border: 1px solid #00631';
    }
}


const regis = document.getElementById('regis').addEventListener('submit', (e) =>{
    e.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const departmentDropdown = document.getElementById('departmentDropdown').value;
    const courseDropdown = document.getElementById('courseDropdown').value;

    const data = {email, password, confirmPassword, phoneNumber, departmentDropdown, courseDropdown};
    fetch('/reg', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => { 
        console.log("respond: ", res);
        alertBox(res);
        if(res.status == 'passed'){
            setTimeout(() => {
                window.location.href= res.redirect;
            }, 1500);
        }
    })
    

  });
