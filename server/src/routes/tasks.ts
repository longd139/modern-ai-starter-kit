import { Router, Request, Response } from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../db.js';

const router = Router();

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
  const { title, description, priority } = req.body;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ error: 'Title is required and must not be empty' });
  }

  const validPriorities = ['low', 'medium', 'high'];
  if (priority && !validPriorities.includes(priority)) {
    return res.status(400).json({ error: 'Priority must be low, medium, or high' });
  }

  const task = createTask({
    title: title.trim(),
    description: description || '',
    priority,
  });

  res.status(201).json({ data: task, message: 'Task created successfully' });
});

// PATCH /api/tasks/:id
router.patch('/:id', (req: Request<{ id: string }>, res: Response) => {
  const { status, title, description, priority } = req.body;

  const validStatuses = ['todo', 'in_progress', 'done'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  const validPriorities = ['low', 'medium', 'high'];
  if (priority && !validPriorities.includes(priority)) {
    return res.status(400).json({ error: 'Invalid priority value' });
  }

  const updated = updateTask(req.params.id, {
    ...(status && { status }),
    ...(title && { title: title.trim() }),
    ...(description !== undefined && { description }),
    ...(priority && { priority }),
  });

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
