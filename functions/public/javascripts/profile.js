import { callServerFunction, checkUserStatus, readDataFromFirestore } from './server.js';

document.addEventListener('DOMContentLoaded', async function() {
  const userStatus = await checkUserStatus();
  console.log("User status:", userStatus);
  // go to login page if user is not logged in
  if (!userStatus.loggedIn) {
    window.location.href = '/login';
  } else {
    // load username from Firestore and display it
    const userData = await readDataFromFirestore('users', userStatus.user.uid);
    console.log("User data:", userData);
    const username = userData.name || userStatus.user.email; // Fallback to email if name is not set
    document.getElementById('username').textContent = username;
  }
});

// Function to handle logout button click
document.getElementById('logout-button').addEventListener('click', async function() {
  await callServerFunction('logout');
  window.location.href = '/login';
});