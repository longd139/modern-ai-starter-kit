import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { resetTasksForTesting, createTask } from '../src/db.js';

describe('Tasks API (/api/tasks)', () => {
  const app = createApp();

  beforeEach(() => {
    resetTasksForTesting();
  });

  describe('GET /api/tasks', () => {
    it('should return empty list when no tasks exist', async () => {
      const res = await request(app).get('/api/tasks');
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
      expect(res.body.count).toBe(0);
    });

    it('should return all tasks', async () => {
      createTask({ title: 'Task 1', description: 'Desc 1' });
      createTask({ title: 'Task 2', description: 'Desc 2' });

      const res = await request(app).get('/api/tasks');
      expect(res.status).toBe(200);
      expect(res.body.count).toBe(2);
      expect(res.body.data[0].title).toBe('Task 1');
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('should return 200 and the task for existing ID', async () => {
      const task = createTask({ title: 'Specific Task', description: 'Detail' });
      const res = await request(app).get(`/api/tasks/${task.id}`);
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(task.id);
      expect(res.body.data.title).toBe('Specific Task');
    });

    it('should return 404 for non-existent task ID', async () => {
      const res = await request(app).get('/api/tasks/non-existent-id');
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Task not found');
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task successfully', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({
          title: 'Learn AI Assisted Development',
          description: 'Practice with Claude Code CLI',
          priority: 'high',
        });

      expect(res.status).toBe(201);
      expect(res.body.data.title).toBe('Learn AI Assisted Development');
      expect(res.body.data.status).toBe('todo');
      expect(res.body.data.priority).toBe('high');
      expect(res.body.data.id).toBeDefined();
    });

    it('should return 400 when title is missing or empty', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({ title: '   ', description: 'No title' });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('Title is required');
    });

    it('should return 400 when priority is invalid', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .send({ title: 'Valid title', priority: 'urgent' });

      expect(res.status).toBe(400);
    });
  });

  describe('PATCH /api/tasks/:id', () => {
    it('should update task status', async () => {
      const task = createTask({ title: 'Review PR' });

      const res = await request(app)
        .patch(`/api/tasks/${task.id}`)
        .send({ status: 'done' });

      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('done');
    });

    it('should update task title and description', async () => {
      const task = createTask({ title: 'Old Title', description: 'Old Desc' });

      const res = await request(app)
        .patch(`/api/tasks/${task.id}`)
        .send({ title: 'New Title', description: 'New Desc' });

      expect(res.status).toBe(200);
      expect(res.body.data.title).toBe('New Title');
      expect(res.body.data.description).toBe('New Desc');
    });

    it('should return 400 when updating with invalid priority', async () => {
      const task = createTask({ title: 'Priority Test' });

      const res = await request(app)
        .patch(`/api/tasks/${task.id}`)
        .send({ priority: 'invalid-priority' });

      expect(res.status).toBe(400);
    });

    it('should return 404 for non-existent task', async () => {
      const res = await request(app)
        .patch('/api/tasks/non-existent-id')
        .send({ status: 'done' });

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Task not found');
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete existing task and return 200', async () => {
      const task = createTask({ title: 'Temporary task' });

      const res = await request(app).delete(`/api/tasks/${task.id}`);
      expect(res.status).toBe(200);

      const check = await request(app).get(`/api/tasks/${task.id}`);
      expect(check.status).toBe(404);
    });

    it('should return 404 when deleting non-existent task', async () => {
      const res = await request(app).delete('/api/tasks/not-found');
      expect(res.status).toBe(404);
    });
  });
});
