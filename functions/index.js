const express = require('express');
const functions = require('firebase-functions');
const path = require('path');
const cors = require('cors');

const { registerWithEmailAndPassword, logInWithEmailAndPassword, logout } = require('./firebase');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to serve an HTML file using res.sendFile()
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'leaderboard.html'));
});

app.get('/leaderboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'leaderboard.html'));
});

app.get('/myteam', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'myteam.html'));
});

app.get('/createteam', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'createteam.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

app.post('/server/run-function', async (req, res) => {
  console.log('Received request:', req.body);
  // return res.status(200).json({ message: 'Request received' });
  const data = JSON.parse(req.body.data);
  try {
    switch (req.body.function) {
      case 'registerWithEmailAndPassword':
        const { name, email, password } = data;
        // Call your Firebase function here
        console.log('Registering with email and password:', name, email, password);
        await registerWithEmailAndPassword(name, email, password);
        break;
      case 'logInWithEmailAndPassword':
        const { loginEmail, loginPassword } = data;
        // Call your Firebase function here
        // Example: await logInWithEmailAndPassword(loginEmail, loginPassword);
        break;
      case 'logout':
        // Call your Firebase function here
        // Example: await logout();
        break;
      default:
        throw new Error('Function not recognized');
    }
    // const result = serverFunction(req.body);
    return res.send({ message: 'Function executed successfully' });
  } catch (error) {
     return res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


exports.app = functions.https.onRequest(app);