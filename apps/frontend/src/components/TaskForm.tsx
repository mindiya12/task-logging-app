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
  const [status, setStatus] = useState('pending');
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
        status,
      });
      setTitle('');
      setDescription('');
      setAssignee('');
      setCreator('');
      setStatus('pending');
    } catch (err: any) {
      setError(err.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error-text">{error}</p>}

      <div className="form-row">
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} disabled={loading} />
      </div>

      <div className="form-row">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="form-row">
        <label>Assignee</label>
        <input value={assignee} onChange={(e) => setAssignee(e.target.value)} disabled={loading} />
      </div>

      <div className="form-row">
        <label>Creator</label>
        <input value={creator} onChange={(e) => setCreator(e.target.value)} disabled={loading} />
      </div>

      <div className="form-row">
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} disabled={loading}>
          <option value="pending">Pending</option>
          <option value="in_progress">In progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <button type="submit" className="primary" disabled={loading}>
        {loading ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskForm;
