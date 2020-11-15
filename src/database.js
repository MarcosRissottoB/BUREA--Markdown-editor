const mongoose = require('mongoose');

// DB connect string
const connection = `mongodb://mongo:27017/${ process.env.DB_NAME }`;

// DB connect
mongoose.connect(connection,
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
   }
)
.then(db => console.log(`Db is connected`))
.catch(err => console.log(err));