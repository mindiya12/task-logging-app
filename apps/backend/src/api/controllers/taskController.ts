import { Request, Response } from 'express';
import { createTaskService, listTasksService } from '../services/taskService';

export async function createTaskHandler(req: Request, res: Response) {
  try {
    const task = await createTaskService(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (err: unknown) {
    console.error('Error creating task', err);
    const message = err instanceof Error ? err.message : 'Failed to create task';
    res.status(400).json({
      success: false,
      message,
    });
  }
}

export async function listTasksHandler(_req: Request, res: Response) {
  try {
    const tasks = await listTasksService();
    res.json({ success: true, data: tasks });
  } catch (err) {
    console.error('Error listing tasks', err);
    res.status(500).json({
      success: false,
      message: 'Failed to list tasks',
    });
  }
}
