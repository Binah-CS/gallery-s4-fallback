import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

export function openDb(path = 'data/app.db') {
  if (path !== ':memory:') mkdirSync(dirname(path), { recursive: true });
  const db = new DatabaseSync(path);
  db.exec(`CREATE TABLE IF NOT EXISTS galleries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    owner TEXT,
    status TEXT
  )`);
  const row = db.prepare('SELECT COUNT(*) AS n FROM galleries').get() as { n: number };
  if (row.n === 0) {
    const ins = db.prepare('INSERT INTO galleries (name, owner, status) VALUES (?, ?, ?)');
    ins.run('Levi wedding', 'dana', 'draft');
    ins.run('Cohen bar mitzvah', 'dana', 'published');
    ins.run('Tel Aviv portraits', 'noa', 'draft');
  }
  return db;
}
