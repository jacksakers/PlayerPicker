const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('./functions/public'));

// Route to serve an HTML file using res.sendFile()
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'functions', 'public', 'leaderboard.html'));
});

app.get('/leaderboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'functions', 'public', 'leaderboard.html'));
});

app.get('/myteam', (req, res) => {
  res.sendFile(path.join(__dirname, 'functions', 'public', 'myteam.html'));
});

app.get('/createteam', (req, res) => {
  res.sendFile(path.join(__dirname, 'functions', 'public', 'createteam.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'functions', 'public', 'profile.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});