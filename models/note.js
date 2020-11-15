const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

const noteSchema = new Schema({
  title:         { type: String, trim: true, maxlength: 100 },
  description:   { type: String, trim: true, maxlength: 2048 },
  markdown:      { type: String, trim: true, maxlength: 2048 },
  createdAt:     { type: Date, default: Date.now },
  slug:          { type: String, required: true, unique: true },
  sanitizedHtml:  { type: String, required: true }
});

noteSchema.pre('validate', function(next) {
  if (this.title) {
    this.slug =slugify(this.title, {lower: true, strict: true})
  }
  if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
  }
  next();
});

module.exports = mongoose.model('Note', noteSchema);