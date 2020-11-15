const express = require('express');
const app = express();
const mongoose = require('mongoose');

const noteRouter = require('./routes/notes');

// Environments
require('dotenv').config()
const port = process.env.PORT || 5000;

// DB connect string
const connection = `mongodb://localhost:27017/${ process.env.DB_NAME }`;

// View engine
app.set('view engine', 'ejs');

// Config
app.use(express.urlencoded({extended: false}));
app.use('/notes', noteRouter);

// Routes
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
  res.render('notes/index', {notes});
})

// DB connect
mongoose.connect(connection,
   { 
     useNewUrlParser: true,
     useUnifiedTopology: true
    }, (err, res) => {
  if(err){
    throw err;
  }else{
    const server = app.listen(port, function(){
      console.log(`Server load ok on port: ${port}`);
    });
  }
});