const express = require('express');
const app = express();
const path = require('path');
const PORT = 3001

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});

app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/bundle.js'));
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
