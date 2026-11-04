import express from 'express';
import cors from 'cors';
import db from './database.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

// ⚠️ REPLACE THESE WITH YOUR CLOUDINARY KEYS
cloudinary.config({ 
  cloud_name: 'hkxr0xbl', 
  api_key: '224682935568315', 
  api_secret: 'k5RpP9cgGtp7Uq6w3cFrzx2etrY' 
});

const upload = multer({ storage: multer.memoryStorage() });
const app = express();
app.use(cors());
app.use(express.json());

// 1. Get all posts
app.get('/api/posts', (req, res) => {
  const posts = db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all();
  res.json(posts);
});

// 2. Create a new post with File Upload
app.post('/api/posts', upload.single('file'), async (req, res) => {
  const { title, category, content, password, link_url } = req.body;
  
  if (password !== 'SamsAcademy2026!') { // Make sure this is your password!
    return res.status(401).json({ error: 'Wrong password' });
  }

  let uploadedFileUrl = null;

  // If a file was uploaded, send it to Cloudinary
  if (req.file) {
    try {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const result = await cloudinary.uploader.upload(dataURI, {
        resource_type: "auto", 
      });
      uploadedFileUrl = result.secure_url;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'File upload failed' });
    }
  }

  // Save everything to the database
  const insert = db.prepare('INSERT INTO posts (title, category, content, link_url, file_url) VALUES (?, ?, ?, ?, ?)');
  insert.run(title, category, content, link_url || null, uploadedFileUrl);
  
  res.json({ success: true, message: 'Post created!' });
});
// 3. Delete a post
app.delete('/api/posts/:id', (req, res) => {
  const { password } = req.body;
  
  if (password !== 'SamsAcademy2026!') { // Make sure this is your password!
    return res.status(401).json({ error: 'Wrong password' });
  }

  const deleteStmt = db.prepare('DELETE FROM posts WHERE id = ?');
  const info = deleteStmt.run(req.params.id);

  if (info.changes > 0) {
    res.json({ success: true, message: 'Post deleted!' });
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});
app.listen(4000, () => {
  console.log('✅ Server running on http://localhost:4000');
});