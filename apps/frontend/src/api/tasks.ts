import { apiGet, apiPost } from './client';
import { Task } from '../types/task';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export async function fetchTasks(): Promise<Task[]> {
  const res = await apiGet<ApiResponse<Task[]>>('/tasks');
  return res.data;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  assignee?: string;
  creator?: string;
  status?: string;
  due_date?: string | null;
}

export async function createTask(payload: CreateTaskPayload): Promise<Task> {
  const res = await apiPost<ApiResponse<Task>, CreateTaskPayload>('/tasks', payload);
  return res.data;
}
