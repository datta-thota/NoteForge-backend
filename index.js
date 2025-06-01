const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const app = express();

const loginRoute = require('./routes/login');
const signupRoute = require('./routes/signup');
const notesRoute = require('./routes/notes');
const profileRoute = require('./routes/profile');
const storiesRoute = require('./routes/stories');

// ✅ Middleware first
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Then register routes
app.use('/login', loginRoute);
app.use('/signup', signupRoute);
app.use('/notes', notesRoute);
app.use('/profile', profileRoute);
app.use('/stories', storiesRoute);


// Default route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(5000, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://192.168.29.63:5000`);
});
