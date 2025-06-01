// routes/signup.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { name, rollNumber, college, email, year, branch, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      rollNumber,
      college,
      email,
      year,
      branch,
      password: hashedPassword,
    });

    await user.save();
    return res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', error });
  }
});

module.exports = router;
