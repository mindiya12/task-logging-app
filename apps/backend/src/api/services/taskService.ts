import { Task } from '../models/task';
import { createTask, listTasks } from '../repositories/taskRepository';

export interface CreateTaskInput {
  title: string;
  description?: string;
  status?: string;
  assignee?: string;
  creator?: string;
  due_date?: Date | null;
}

export async function createTaskService(input: CreateTaskInput): Promise<Task> {
  if (!input.title || input.title.trim().length === 0) {
    throw new Error('Title is required');
  }

  // could add more business rules here later
  return createTask(input);
}

export async function listTasksService(): Promise<Task[]> {
  return listTasks();
}
