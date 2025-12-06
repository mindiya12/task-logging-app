export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: string;
  assignee: string | null;
  creator: string | null;
  due_date: Date | null;
  created_at: Date;
}
