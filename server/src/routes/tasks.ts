import { Router, Request, Response } from 'express';
import { z } from 'zod';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../db.js';

const router = Router();

// Zod schemas per CLAUDE.md conventions
const createTaskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required and must not be empty'),
  description: z.string().optional().default(''),
  priority: z.enum(['low', 'medium', 'high']).optional().default('medium'),
});

const updateTaskSchema = z.object({
  title: z.string().trim().min(1, 'Title must not be empty').optional(),
  description: z.string().optional(),
  status: z.enum(['todo', 'in_progress', 'done']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
});

// GET /api/tasks
router.get('/', (_req: Request, res: Response) => {
  const tasks = getTasks();
  res.json({ data: tasks, count: tasks.length });
});

// GET /api/tasks/:id
router.get('/:id', (req: Request<{ id: string }>, res: Response) => {
  const task = getTaskById(req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json({ data: task });
});

// POST /api/tasks
router.post('/', (req: Request, res: Response) => {
  const parsed = createTaskSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: parsed.error.issues.map((i) => i.message).join(', '),
    });
  }

  const task = createTask(parsed.data);
  res.status(201).json({ data: task, message: 'Task created successfully' });
});

// PATCH /api/tasks/:id
router.patch('/:id', (req: Request<{ id: string }>, res: Response) => {
  const parsed = updateTaskSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: parsed.error.issues.map((i) => i.message).join(', '),
    });
  }

  const updated = updateTask(req.params.id, parsed.data);
  if (!updated) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json({ data: updated });
});

// DELETE /api/tasks/:id
router.delete('/:id', (req: Request<{ id: string }>, res: Response) => {
  const success = deleteTask(req.params.id);
  if (!success) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.status(200).json({ message: 'Task deleted successfully' });
});

export default router;
