async function callServerFunction(functionToCall, data) {
  try {
    const response = await fetch('/server/run-function', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        function: functionToCall,
        data: JSON.stringify(data),
      }),
    });

    if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error calling server function:", error);
    throw error;
  }
}

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
    
});