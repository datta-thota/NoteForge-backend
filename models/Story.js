const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  episodes: [episodeSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Story', storySchema);
