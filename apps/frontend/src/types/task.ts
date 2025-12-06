export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: string;
  assignee: string | null;
  creator: string | null;
  due_date: string | null; // ISO string from backend
  created_at: string; // ISO string
}
