const express = require('express');
const router = express.Router();

// Controllers
const NoteController = require('../controllers/NoteController');

// Models
const Note = require('../models/note');

router.get('/', NoteController.findAll);

router.get('/new', (req, res) => {
  res.render('notes/new', {note: new Note()});
})

router.put('/edit/:id', NoteController.update);

router.get('/:slug', NoteController.findOne);

router.post('/', NoteController.create);

router.delete('/:id', NoteController.remove);

module.exports = router;