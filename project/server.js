const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const multer = require('multer');
const app = express();
const PORT = 3000;

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Get list of files
app.get('/api/files', async (req, res) => {
  try {
    const files = await fs.readdir(path.join(__dirname, 'files'));
    res.json({ files });
  } catch (error) {
    res.status(500).json({ error: 'Error reading files directory' });
  }
});

// Get file content
app.get('/api/files/:filename', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'files', req.params.filename);
    const content = await fs.readFile(filePath, 'utf-8');
    res.json({ content });
  } catch (error) {
    res.status(404).json({ error: 'File not found' });
  }
});

// Upload file
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ message: 'File uploaded successfully' });
});

// Update file content
app.put('/api/files/:filename', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'files', req.params.filename);
    await fs.writeFile(filePath, req.body.content);
    res.json({ message: 'File updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating file' });
  }
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});