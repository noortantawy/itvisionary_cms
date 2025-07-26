// /frontend/pages/api/admin/update-file.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { path: filePath, content } = req.body;
  const baseDir = path.resolve(process.cwd(), 'frontend');
  const fullPath = path.join(baseDir, filePath);

  if (!fullPath.startsWith(baseDir)) return res.status(403).end('Forbidden');

  try {
    fs.writeFileSync(fullPath, content, 'utf-8');
    res.status(200).json({ message: 'File updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
