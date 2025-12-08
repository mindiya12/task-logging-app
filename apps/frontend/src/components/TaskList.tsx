import React from 'react';
import { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  if (tasks.length === 0) {
    return <p>No tasks yet.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <div className="task-title">
            #{task.id} — {task.title}
          </div>
          <div className="task-meta">
            Status: {task.status}
            {task.assignee ? ` • Assignee: ${task.assignee}` : ''}
          </div>
          <div className="task-meta">
            Created at: {task.created_at ? new Date(task.created_at).toLocaleString() : 'N/A'}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
