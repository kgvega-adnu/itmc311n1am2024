document.addEventListener('DOMContentLoaded', function () {
    const signUpButton = document.getElementById('signUpButton');
    const signInButton = document.getElementById('signInButton');
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');

    // Initial display setup
    signInForm.style.display = 'block';
    signUpForm.style.display = 'none';

    // Show sign-up form and hide sign-in form
    signUpButton.addEventListener('click', function () {
        signInForm.style.display = 'none';
        signUpForm.style.display = 'block';
    });

    // Show sign-in form and hide sign-up form
    signInButton.addEventListener('click', function () {
        signUpForm.style.display = 'none';
        signInForm.style.display = 'block';
    });
});
