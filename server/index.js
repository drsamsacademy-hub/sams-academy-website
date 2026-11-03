import express from 'express';
import cors from 'cors';
import db from './database.js';

const app = express();
app.use(cors());
app.use(express.json());

// 1. Get all posts (for the website to read)
app.get('/api/posts', (req, res) => {
  const posts = db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all();
  res.json(posts);
});

// 2. Create a new post (for you to publish notes)
app.post('/api/posts', (req, res) => {
  const { title, category, content, password } = req.body;
  
  if (password !== 'admin123') {
    return res.status(401).json({ error: 'Wrong password' });
  }

  const insert = db.prepare('INSERT INTO posts (title, category, content) VALUES (?, ?, ?)');
  insert.run(title, category, content);
  
  res.json({ success: true, message: 'Post created!' });
});

app.listen(4000, () => {
  console.log('✅ Server running on http://localhost:4000');
});