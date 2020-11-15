const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('notes');
})

router.get('/new', (req, res) => {
  res.render('notes/new');
})

router.post('/', (req, res) => {
  res.render('notes/new');
})

module.exports = router;