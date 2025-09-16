import express from 'express';
import path from 'path';

export const serveStatic = (app: express.Application) => {
  // Serve static files from the dist/public directory
  app.use(express.static(path.join(process.cwd(), 'dist', 'public')));

  // Handle client-side routing by serving index.html for all routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist', 'public', 'index.html'));
  });
};