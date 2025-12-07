import React, { useEffect, useState } from 'react';
import { Task } from '../types/task';
import { fetchTasks, createTask, CreateTaskPayload } from '../api/tasks';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreate = async (payload: CreateTaskPayload) => {
    const newTask = await createTask(payload);
    setTasks((prev) => [newTask, ...prev]); // prepend for newest first
  };

  return (
    <div className="app-root">
      <h1>Task Logging App</h1>

      <div className="card">
        <h2>Create Task</h2>
        <TaskForm onCreate={handleCreate} />
      </div>

      <div className="card">
        <h2>Tasks</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && !error && <TaskList tasks={tasks} />}
      </div>
    </div>
  );
};

export default TasksPage;
