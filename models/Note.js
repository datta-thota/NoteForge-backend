const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  topic: String,
  subject: String,
  description: String,
  semester: String,
  college: String,
  fileUrl: String,
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Note', noteSchema);
