const express = require('express');
const path = require('path');

const { v4: uuidv4} = require('uuid');

const apiRoutes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3001;

// using express to use middleware functions 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Use apiRoute
app.use('/api', apiRoutes);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});