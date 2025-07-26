// /frontend/pages/api/admin/get-file.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { path: filePath } = req.query;
  const baseDir = path.resolve(process.cwd(), 'frontend'); // Secure base
  const fullPath = path.join(baseDir, filePath);

  if (!fullPath.startsWith(baseDir)) {
    return res.status(403).end('Forbidden');
  }

  try {
    const content = fs.readFileSync(fullPath, 'utf-8');
    res.status(200).json({ content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
