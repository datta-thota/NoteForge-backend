const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const Notes = require('../models/Note');
const fs = require('fs');
const path = require('path'); // ✅ Required for file extension

// Configure multer for local temp storage
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), async (req, res) => {
  console.log("🚀 Upload route hit");

  if (!req.file) {
    console.log("❌ No file found in request");
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log("📁 File received:", req.file);
  console.log("📝 Metadata received:", req.body);

  try {
const publicId = path.parse(req.file.originalname).name.replace(/\s+/g, '_');

    const result = await cloudinary.uploader.upload(req.file.path, {
  folder: 'stedu_notes',
  resource_type: 'raw',
  use_filename: true,
public_id: publicId,
  unique_filename: true,
});


    // ✅ Append the correct extension to the URL for Google Docs Viewer
const fileUrl = result.secure_url;

    const newNote = new Notes({
      topic: req.body.topic,
      subject: req.body.subject,
      description: req.body.description,
      semester: req.body.semester,
      college: req.body.college,
      fileUrl: fileUrl, // ✅ Save usable URL
      fileType: result.resource_type,
    });

    await newNote.save();

    fs.unlinkSync(req.file.path); // delete temp file

    res.status(200).json({ message: 'Note uploaded successfully', note: newNote });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed', error });
  }
});

router.get('/all', async (req, res) => {
  try {
    const notes = await Notes.find().sort({ uploadedAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notes', error });
  }
});

module.exports = router;
