const Note = require('../models/note');

const create = async (req, res, next) => {
   
  const { body } = req;
  const {title, description, markdown, createdAt} = body;
  let note = new Note({
    title,
    description,
    markdown,
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

const findById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (!note) res.redirect('/');
    res.render('notes/show', {note});
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
}
const findAll = async (req, res, next) => {
  try {
    let notes = await Note.find().sort({
      createdAt: 'desc'
    });
    console.log('notes', notes);
    res.render('notes/show', {notes});
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
}

module.exports = {
  create,
  findById,
  findAll
};
