import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const basePath = path.join(process.cwd(), 'frontend');

  const { filePath } = req.query;

  if (req.method === 'GET') {
    // Example: /api/files?filePath=components/Header.js
    const fullPath = path.join(basePath, filePath);
    try {
      const content = fs.readFileSync(fullPath, 'utf-8');
      return res.status(200).json({ content });
    } catch (err) {
      return res.status(500).json({ error: 'File not found or unreadable' });
    }
  }

  if (req.method === 'POST') {
    const { newContent } = req.body;
    const fullPath = path.join(basePath, filePath);

    try {
      fs.writeFileSync(fullPath, newContent, 'utf-8');
      return res.status(200).json({ message: 'File updated' });
    } catch (err) {
      return res.status(500).json({ error: 'Could not write file' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
