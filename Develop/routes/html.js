const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });
  
  router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
  });
  // renders index.html if nothing elsee
  router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

  module.exports = router;