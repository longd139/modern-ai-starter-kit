import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import healthRouter from './routes/health.js';
import tasksRouter from './routes/tasks.js';

export const createApp = () => {
  const app = express();

  // Middleware
  // INSTRUCTOR NOTE: origin: '*' with credentials: true is intentionally configured
  // as an exercise finding for students to detect using Semgrep in Session 7 (Secure AI Code).
  app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  }));
  app.use(express.json());

  // Routes
  app.use(healthRouter);
  app.use('/api/tasks', tasksRouter);

  // 404 Handler
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Endpoint not found' });
  });

  // Global Error Handler
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Unhandled server error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
};

export default createApp;
