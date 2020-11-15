const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title:         { type: String, trim: true, maxlength: 100 },
  description:   { type: String, trim: true, maxlength: 2048 },
  createdAt:     { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', noteSchema);