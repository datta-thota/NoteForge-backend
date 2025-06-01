// config/storage.js
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'stedu_notes',
    allowed_formats: ['jpg', 'png', 'pdf', 'docx'],
  },
});

module.exports = storage;
