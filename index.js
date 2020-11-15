const express = require('express');
const app = express();
const methodOverride = require('method-override');

const noteRouter = require('./routes/notes');

// Database
require('./src/database');

// Models
const Note = require('./models/note');

// Environments
require('dotenv').config()
const port = process.env.PORT || 5000;

// View engine
app.set('view engine', 'ejs');

// Config
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use('/notes', noteRouter);

// Initial dump db with thow notes
const notesDump = () =>  [
  {
  title: 'Test note',
  createdAt: new Date(),
  description: 'Example description'
  },
  {
    title: 'Test note 2',
    createdAt: new Date(),
    description: 'Example description 2'
  }
];

// Routes
app.get('/', async (req, res) => {
  const notes = await Note.find().sort({
    createdAt: 'desc'
  });
  if (!notes) {
    notes = notesDump();
  }
  res.render('notes/index', {notes});
})

app.listen(port, () => {
  console.log(`Server listen on port: ${port}`)
})