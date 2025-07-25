const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const util = require('util');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Page Schema
const pageSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  header: { type: String, default: '' },
  footer: { type: String, default: '' },
  navigation: { type: [String], default: [] },
  bodies: [{
    type: { type: String, enum: ['text', 'image', 'component'], required: true },
    content: { type: String },
    componentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Component' }
  }],
  updatedAt: { type: Date, default: Date.now }
});
const Page = mongoose.model('Page', pageSchema);

// Component Schema
const componentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, enum: ['box', 'container'], required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Component = mongoose.model('Component', componentSchema);

// Global Schema for Header and Footer
const globalSchema = new mongoose.Schema({
  header: { type: String, default: '' },
  footer: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now }
});
const Global = mongoose.model('Global', globalSchema);

const seedComponents = async () => {
  const components = [
    { name: 'ServiceBox', type: 'box', content: '<div class="service-box bg-blue-200 p-4 rounded">Service Content</div>' },
    { name: 'ProductContainer', type: 'container', content: '<div class="product-container bg-gray-100 p-6 rounded">Product List</div>' },
    { name: 'PartnerBox', type: 'box', content: '<div class="partner-box bg-green-200 p-4 rounded">Partner Logo</div>' }
  ];
  for (const comp of components) {
    const existing = await Component.findOne({ name: comp.name });
    if (!existing) await Component.create(comp);
  }
};
seedComponents().catch(err => console.error('Seed error:', err));

// Seed initial global content
const seedGlobal = async () => {
  const existing = await Global.findOne();
  if (!existing) await Global.create({});
};
seedGlobal().catch(err => console.error('Seed error:', err));

app.get('/api/pages', async (req, res) => {
  const pages = await Page.find().populate('bodies.componentId');
  res.json(pages);
});

app.get('/api/pages/:slug', async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug }).populate('bodies.componentId');
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/pages', async (req, res) => {
  try {
    const { slug, title, header, footer, navigation, bodies } = req.body;
    if (!slug || !title || !bodies || !Array.isArray(bodies)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const existingPage = await Page.findOne({ slug });
    if (existingPage) {
      return res.status(400).json({ error: 'Slug already exists' });
    }
    const validBodies = bodies.map(body => {
      if (body.type === 'component' && !body.componentId) {
        throw new Error('Component type requires a componentId');
      }
      return {
        type: body.type,
        content: body.content || '',
        componentId: body.componentId
      };
    });
    const page = new Page({ slug, title, header, footer, navigation, bodies: validBodies });
    await page.save();
    res.status(201).json(await page.populate('bodies.componentId'));
  } catch (err) {
    res.status(500).json({ error: err.message || 'Server error' });
  }
});

app.put('/api/pages/:slug', async (req, res) => {
  try {
    const { title, header, footer, navigation, bodies } = req.body;
    const page = await Page.findOneAndUpdate(
      { slug: req.params.slug },
      { title, header, footer, navigation, bodies, updatedAt: Date.now() },
      { new: true, runValidators: true }
    ).populate('bodies.componentId');
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/pages/:slug', async (req, res) => {
  try {
    const page = await Page.findOneAndDelete({ slug: req.params.slug });
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json({ message: 'Page deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/components', async (req, res) => {
  const components = await Component.find();
  res.json(components);
});

app.post('/api/components', async (req, res) => {
  try {
    const { name, type, content } = req.body;
    if (!name || !type || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const existingComponent = await Component.findOne({ name });
    if (existingComponent) {
      return res.status(400).json({ error: 'Component name already exists' });
    }
    const component = new Component({ name, type, content });
    await component.save();
    res.status(201).json(component);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/static-pages', async (req, res) => {
  const readdir = util.promisify(fs.readdir);
  try {
    const pagesDir = path.join( 'frontend', 'pages'); // Adjust if needed
    const files = await readdir(pagesDir);
    const staticPages = files
      .filter(file => file.endsWith('.js') && !file.startsWith('_') && file !== 'admin.js')
      .map(file => {
        const slug = file.replace('.js', '').toLowerCase();
        return { slug, title: slug.charAt(0).toUpperCase() + slug.slice(1), source: 'static' };
      });
    res.json(staticPages);
  } catch (err) {
    console.error('Error reading pages directory:', err);
    res.status(500).json({ error: 'Failed to read static pages' });
  }
});

// New endpoint to get/set global header and footer
app.get('/api/global', async (req, res) => {
  const global = await Global.findOne() || await Global.create({});
  res.json(global);
});

app.put('/api/global', async (req, res) => {
  try {
    const { header, footer } = req.body;
    const global = await Global.findOneAndUpdate(
      {},
      { header, footer, updatedAt: Date.now() },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(global);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));