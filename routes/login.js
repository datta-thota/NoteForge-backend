const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { rollNumber, password } = req.body;
  console.log('Login request:', rollNumber);

  try {
    const user = await User.findOne({ rollNumber });

    if (!user) {
      return res.status(401).json({ message: 'Invalid College ID or Password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid College ID or Password' });
    }

    return res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
