import dotenv from 'dotenv';
import { createApp } from './app.js';

dotenv.config();

const app = createApp();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`[Server] Running on http://localhost:${PORT}`);
  console.log(`[Server] Healthcheck: http://localhost:${PORT}/health`);
  console.log(`[Server] API Tasks:  http://localhost:${PORT}/api/tasks`);
});
