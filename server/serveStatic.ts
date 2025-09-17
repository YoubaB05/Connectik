import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function serveStatic(app: express.Application) {
  const publicPath = path.join(__dirname, '../public');
  
  app.use(express.static(publicPath));
  
  app.get('*', (_req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}