import { createApp } from './app.ts';
import { openDb } from './db.ts';

const app = createApp(openDb());
app.listen(3000, () => console.log('Gallery API on http://localhost:3000'));
