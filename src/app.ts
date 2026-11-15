import express from 'express';
import type { DatabaseSync } from 'node:sqlite';

export function createApp(db: DatabaseSync) {
  const app = express();
  app.use(express.json());

  app.get('/api/galleries', (req, res) => {
    const userId = req.header('X-User-Id');
    const all = db.prepare('SELECT * FROM galleries').all() as any[];
    const galleries = userId ? all.filter((g) => g.owner === userId) : all;
    res.json(galleries);
  });

  return app;
}
