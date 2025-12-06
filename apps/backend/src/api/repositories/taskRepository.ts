import { pool } from '../../config/db';
import { Task } from '../models/task';

export async function createTask(data: {
  title: string;
  description?: string;
  status?: string;
  assignee?: string;
  creator?: string;
  due_date?: Date | null;
}): Promise<Task> {
  const result = await pool.query<Task>(
    `
    INSERT INTO tasks (title, description, status, assignee, creator, due_date)
    VALUES ($1, $2, COALESCE($3, 'pending'), $4, $5, $6)
    RETURNING *
    `,
    [
      data.title,
      data.description ?? null,
      data.status ?? null,
      data.assignee ?? null,
      data.creator ?? null,
      data.due_date ?? null,
    ],
  );

  return result.rows[0];
}

export async function listTasks(): Promise<Task[]> {
  const result = await pool.query<Task>('SELECT * FROM tasks ORDER BY created_at DESC');
  return result.rows;
}
