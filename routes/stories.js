const express = require('express');
const router = express.Router();
const Story = require('../models/Story');

// Get all stories
router.get('/', async (req, res) => {
  const stories = await Story.find().select('title description');
  res.json(stories);
});

// Get a single story with episodes
router.get('/:id', async (req, res) => {
  const story = await Story.findById(req.params.id);
  res.json(story);
});

// Add new story (used by you)
router.post('/', async (req, res) => {
  const { title, description, episodes } = req.body;
  const newStory = new Story({ title, description, episodes });
  await newStory.save();
  res.json({ message: 'Story created' });
});

module.exports = router;
