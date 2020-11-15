const express = require('express');
const router = express.Router();

// Controllers
const NoteController = require('../controllers/NoteController');

// Models
const Note = require('../models/note');

router.get('/', (req, res) => {
  res.send('notes');
})

router.get('/new', (req, res) => {
  res.render('notes/new', {note: new Note()});
})

router.get('/:id', (req, res) => {
  res.send(req.params.id);
})

router.post('/', NoteController.createNote);

module.exports = router;