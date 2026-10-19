import { randomUUID } from 'crypto';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

let tasks: Task[] = [
  {
    id: randomUUID(),
    title: 'Khởi tạo dự án & setup CLAUDE.md',
    description: 'Chạy thử Claude Code với file CLAUDE.md cấu hình mẫu.',
    status: 'done',
    priority: 'high',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: randomUUID(),
    title: 'Viết test cho API tasks',
    description: 'Bổ sung unit test và integration test với Vitest & Supertest.',
    status: 'in_progress',
    priority: 'high',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: randomUUID(),
    title: 'Tích hợp giao diện Kanban React',
    description: 'Hiển thị các thẻ theo cột Todo, In Progress, Done.',
    status: 'todo',
    priority: 'medium',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const getTasks = (): Task[] => [...tasks];

export const getTaskById = (id: string): Task | undefined =>
  tasks.find((t) => t.id === id);

export const createTask = (
  data: Pick<Task, 'title' | 'description'> & { priority?: Task['priority'] }
): Task => {
  const newTask: Task = {
    id: randomUUID(),
    title: data.title,
    description: data.description || '',
    status: 'todo',
    priority: data.priority || 'medium',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  return newTask;
};

export const updateTask = (
  id: string,
  updates: Partial<Omit<Task, 'id' | 'createdAt'>>
): Task | null => {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;

  tasks[index] = {
    ...tasks[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  return tasks[index];
};

export const deleteTask = (id: string): boolean => {
  const initialLength = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);
  return tasks.length < initialLength;
};

export const resetTasksForTesting = (): void => {
  tasks = [];
};
