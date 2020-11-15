const Note = require('../models/note');

const createNote = async (req, res, next) => {
   
  const { body } = req;
  const {title, description, createdAt} = body;
  let note = new Note({
    title,
    description,
    createdAt
  });
  try {
    note = await note.save();
    res.redirect(`/notes/${note.id}`);
  } catch (err) {
    console.log(err);
    res.render('notes/new',{note})
  }
}

module.exports = {
  createNote
};
