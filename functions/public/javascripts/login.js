import { callServerFunction, checkUserStatus } from './server.js';

document.addEventListener('DOMContentLoaded', async function() {
  const userStatus = await checkUserStatus();
  console.log("User status:", userStatus);
  // go to profile page if user is logged in
  if (userStatus.loggedIn) {
    window.location.href = '/profile';
  }
});

document.getElementById('signup-button').addEventListener('click', async function() {
  const userName = document.getElementById('username').value;
  const userEmail = document.getElementById('email').value;
  const userPassword = document.getElementById('password').value;
  const userConfirmPassword = document.getElementById('confirm-password').value;

  if (userPassword !== userConfirmPassword) {
    alert("Passwords do not match!");
    return;
  }
  if (userName === "" || userEmail === "" || userPassword === "") {
    alert("Please fill in all fields!");
    return;
  }
  await callServerFunction('registerWithEmailAndPassword', {
    name: userName,
    email: userEmail,
    password: userPassword,
  })
  .then(() => {
    window.location.href = '/profile';
  })
    
});

const toggleAuthButton = document.getElementById('toggle-auth-button');
const signUpButton = document.getElementById('signup-button');
const signInButton = document.getElementById('signin-button');
const usernameField = document.getElementById('username');
const confirmPasswordField = document.getElementById('confirm-password');

toggleAuthButton.addEventListener('click', function() {
  const isSignUpMode = signUpButton.style.display === 'none';
  signUpButton.style.display = isSignUpMode ? '' : 'none';
  signInButton.style.display = isSignUpMode ? 'none' : '';
  usernameField.style.display = isSignUpMode ? '' : 'none';
  confirmPasswordField.style.display = isSignUpMode ? '' : 'none';
  toggleAuthButton.textContent = isSignUpMode ? 'Switch to Sign In' : 'Switch to Sign Up';
});

document.getElementById('signin-button').addEventListener('click', async function() {
  const userEmail = document.getElementById('email').value;
  const userPassword = document.getElementById('password').value;

  if (userEmail === "" || userPassword === "") {
    alert("Please fill in all fields!");
    return;
  }
  await callServerFunction('logInWithEmailAndPassword', {
    email: userEmail,
    password: userPassword,
  })
  .then(() => {
    window.location.href = '/profile';
  })
    
});
