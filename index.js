const express = require('express');
const app = express();
const noteRouter = require('./routes/notes');

require('dotenv').config()
const port = process.env.PORT || 5000;

// View engine
app.set('view engine', 'ejs');

// Routes
app.use('/notes', noteRouter);

app.get('/', (req, res) => {
  const notes = [
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
  ]
  res.render('index', {notes});
})

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});