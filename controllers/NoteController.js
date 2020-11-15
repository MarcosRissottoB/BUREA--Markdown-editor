const Note = require('../models/note');

const create = async (req, res, next) => {
  const { body } = req;
  const { title, description, markdown, createdAt } = body;
  let note = new Note({
    title,
    description,
    markdown,
    createdAt
  });
  try {
    note = await note.save();
    res.redirect(`/notes/${note.slug}`);
    next();
  } catch (err) {
    console.log(err);
    res.render('notes/new',{note})
  }
}

const findOne = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const note = await Note.findOne({slug});
    if (!note) res.redirect('/');
    res.render('notes/show', {note});
    next();
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
}

const editFindOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (!note) res.redirect('/');
    res.render('notes/edit', {note});
    next();
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
    res.render('notes/show', {notes});
    next();
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
}

const update = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  const { title, description, markdown, createdAt } = body;
  let newNote = new Note({
    title,
    description,
    markdown,
    createdAt
  });
  try {
    let note = await Note.findById(id);
    if (!note) res.redirect('notes/new',{note})
      note = newNote;
      await newNote.save();
      res.redirect(`/notes/${note.slug}`);
      next();
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
}

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Note.findByIdAndDelete(id);
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
}

module.exports = {
  create,
  findOne,
  findAll,
  update,
  editFindOne,
  remove
};
