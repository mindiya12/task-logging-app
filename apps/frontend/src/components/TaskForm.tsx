import React, { useState } from 'react';
import { CreateTaskPayload } from '../api/tasks';

interface TaskFormProps {
  onCreate: (payload: CreateTaskPayload) => Promise<void>;
}

const TaskForm: React.FC<TaskFormProps> = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [creator, setCreator] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setLoading(true);
    try {
      await onCreate({
        title,
        description: description || undefined,
        assignee: assignee || undefined,
        creator: creator || undefined,
      });
      setTitle('');
      setDescription('');
      setAssignee('');
      setCreator('');
    } catch (err: any) {
      setError(err.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>
          Title:
          <input value={title} onChange={(e) => setTitle(e.target.value)} disabled={loading} />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />
        </label>
      </div>
      <div>
        <label>
          Assignee:
          <input
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            disabled={loading}
          />
        </label>
      </div>
      <div>
        <label>
          Creator:
          <input value={creator} onChange={(e) => setCreator(e.target.value)} disabled={loading} />
        </label>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;
