import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  const { method, query, body } = req;

  if (method === 'GET') {
    try {
      const { section, slug } = query;
      let content = '';

      if (section === 'header') {
        content = await fs.readFile(path.join(process.cwd(), 'components/header.js'), 'utf8');
      } else if (section === 'footer') {
        content = await fs.readFile(path.join(process.cwd(), 'components/footer.js'), 'utf8');
      } else if (section === 'body' && slug) {
        const page = [
          { slug: 'home', path: 'pages/index.js' },
          { slug: 'about', path: 'pages/about.js' },
          // Add more pages as needed
        ].find(p => p.slug === slug);
        if (page) content = await fs.readFile(path.join(process.cwd(), page.path), 'utf8');
      }

      res.status(200).json({ content: content || '<p>Default Content</p>' });
    } catch (err) {
      console.error('Error fetching file content:', err);
      res.status(500).json({ error: 'Failed to fetch content' });
    }
  } else if (method === 'PUT') {
    try {
      const { section, slug, content } = body;
      if (!section || !content) {
        return res.status(400).json({ error: 'Section and content are required' });
      }

      if (section === 'header') {
        await fs.writeFile(path.join(process.cwd(), 'frontend/components/header.js'), content);
      } else if (section === 'footer') {
        await fs.writeFile(path.join(process.cwd(), 'frontend/components/footer.js'), content);
      } else if (section === 'body' && slug) {
        const page = [
          { slug: 'home', path: 'frontend/pages/index.js' },
          { slug: 'about', path: 'frontend/pages/about.js' },
          // Add more pages as needed
        ].find(p => p.slug === slug);
        if (page) await fs.writeFile(path.join(process.cwd(), page.path), content);
      }

      res.status(200).json({ message: 'Content saved successfully' });
    } catch (err) {
      console.error('Error saving file content:', err);
      res.status(500).json({ error: 'Failed to save content' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}