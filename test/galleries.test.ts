import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.ts';
import { openDb } from '../src/db.ts';

test('GET /api/galleries returns the galleries', async () => {
  const app = createApp(openDb(':memory:'));
  const server = app.listen(0);
  const { port } = server.address() as { port: number };
  const res = await fetch(`http://localhost:${port}/api/galleries`, {
    headers: { 'X-User-Id': 'dana' },
  });
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.ok(Array.isArray(body));
  assert.ok(body.length > 0);
  server.close();
});
