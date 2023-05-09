const express = require('express');
const path = require('path');
const apiRoutes = require('./Develop/api/notes');
const app = express();
const PORT = process.env.PORT || 3001;

// middleware functions 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// routes
app.use(apiRoutes);

// GET routes
// for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

// for note page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

// location of app
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});