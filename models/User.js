const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  college: String,
  email: String,
  year: String,
  branch: String,
  password: String,
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
