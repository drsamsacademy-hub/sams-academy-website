import express from 'express';
import cors from 'cors';
import db from './database.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

// ⚠️ YOUR CLOUDINARY KEYS HERE
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
app.get('/api/posts', async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM posts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Create a new post
app.post('/api/posts', upload.single('file'), async (req, res) => {
  const { title, category, content, password, link_url } = req.body;
  
  if (password !== 'SamsAcademy2026!') { 
    return res.status(401).json({ error: 'Wrong password' });
  }

  let uploadedFileUrl = null;

  if (req.file) {
    try {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const result = await cloudinary.uploader.upload(dataURI, { resource_type: "auto" });
      uploadedFileUrl = result.secure_url;
    } catch (error) {
      return res.status(500).json({ error: 'File upload failed' });
    }
  }

  try {
    await db.execute({
      sql: 'INSERT INTO posts (title, category, content, link_url, file_url) VALUES (?, ?, ?, ?, ?)',
      args: [title, category, content, link_url || null, uploadedFileUrl]
    });
    res.json({ success: true, message: 'Post created!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Delete a post
app.delete('/api/posts/:id', async (req, res) => {
  const { password } = req.body;
  
  if (password !== 'SamsAcademy2026!') {
    return res.status(401).json({ error: 'Wrong password' });
  }

  try {
    const result = await db.execute({
      sql: 'DELETE FROM posts WHERE id = ?',
      args: [req.params.id]
    });

    if (result.rowsAffected > 0) {
      res.json({ success: true, message: 'Post deleted!' });
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(4000, () => {
  console.log('✅ Server running on http://localhost:4000');
});