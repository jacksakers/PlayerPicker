const express = require('express');
const functions = require('firebase-functions');
const path = require('path');
const cors = require('cors');

const { registerWithEmailAndPassword, logInWithEmailAndPassword, 
  writeDataToFirestore, readDataFromFirestore, logout, checkUserStatus } = require('./firebase');

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

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/server/run-function', async (req, res) => {
  console.log('Received request:', req.body);
  // Parse the data as JSON
  let data;
  if (req.body.data && typeof req.body.data === 'string') {
      data = JSON.parse(req.body.data);
  }
  // const data = JSON.parse(req.body.data);
  try {
    switch (req.body.function) {
      case 'registerWithEmailAndPassword':
        const { name, email, password } = data;
        // Call your Firebase function here
        console.log('Registering with email and password:', name, email, password);
        await registerWithEmailAndPassword(name, email, password);
        break;
      case 'logInWithEmailAndPassword':
        const loginEmail = data.email;
        const loginPassword = data.password;
        await logInWithEmailAndPassword(loginEmail, loginPassword);
        break;
      case 'logout':
        logout();
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

app.get('/server/check-user-status', async (req, res) => {
  try {
    const userStatus = await checkUserStatus();
    return res.json(userStatus);
  } catch (error) {
    console.error("Error checking user status:", error);
    return res.status(500).json({ error: error.message });
  }
}
);

app.get('/server/read-data', async (req, res) => {
  const collectionName = req.query.collection;
  const documentId = req.query.document;
  console.log("Reading data from collection:", collectionName, "Document ID:", documentId);
  if (!collectionName) {
    return res.status(400).json({ error: 'Collection name is required' });
  }
  try {
    const data = await readDataFromFirestore(collectionName, documentId);
    return res.json(data);
  } catch (error) {
    console.error("Error reading data from Firestore:", error);
    return res.status(500).json({ error: error.message });
  }
}
);

app.post('/server/write-data', async (req, res) => {
  const collectionName = req.query.collection;
  const docID = req.query.document;
  const data = req.body;
  console.log("Writing data to collection:", collectionName, "Document ID:", docID, "Data:", data);
  if (!collectionName || !data) {
    return res.status(400).json({ error: 'Collection name and data are required' });
  }
  try {
    await writeDataToFirestore(collectionName, data, docID);
    return res.json({ message: 'Data written successfully' });
  } catch (error) {
    console.error("Error writing data to Firestore:", error);
    return res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


exports.app = functions.https.onRequest(app);