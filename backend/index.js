// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const pageSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
});
const Page = mongoose.model('Page', pageSchema);

app.get('/api/pages', async (req, res) => {
  const pages = await Page.find();
  res.json(pages);
});

app.get('/api/pages/:slug', async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/pages', async (req, res) => {
  try {
    const { slug, title, content } = req.body;
    if (!slug || !title || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const existingPage = await Page.findOne({ slug });
    if (existingPage) {
      return res.status(400).json({ error: 'Slug already exists' });
    }
    const page = new Page({ slug, title, content });
    await page.save();
    res.status(201).json(page);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));