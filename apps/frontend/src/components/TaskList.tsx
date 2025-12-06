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
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <strong>{task.title}</strong> – {task.status}{' '}
          {task.assignee ? ` (Assignee: ${task.assignee})` : null}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
