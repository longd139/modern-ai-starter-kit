import React, { useState, useEffect } from 'react';
import './TaskBoard.css';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

const API_BASE = import.meta.env.VITE_API_URL || '';

const COLUMNS: { id: Task['status']; label: string; icon: string }[] = [
  { id: 'todo', label: 'Cần làm (Todo)', icon: '📋' },
  { id: 'in_progress', label: 'Đang làm (In Progress)', icon: '⚡' },
  { id: 'done', label: 'Hoàn thành (Done)', icon: '✅' },
];

export const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState<Task['priority']>('medium');
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showFeedback = (text: string, type: 'success' | 'error' = 'success') => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback(null), 4000);
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/tasks`);
      if (!res.ok) throw new Error('Không thể tải danh sách tasks');
      const json = await res.json();
      setTasks(json.data || []);
      setError(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Lỗi kết nối server';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const res = await fetch(`${API_BASE}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle.trim(),
          description: newDesc.trim(),
          priority: newPriority,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Lỗi khi tạo task');
      }

      setNewTitle('');
      setNewDesc('');
      showFeedback('Tạo công việc mới thành công!', 'success');
      await fetchTasks();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Lỗi không xác định khi tạo task';
      showFeedback(message, 'error');
    }
  };

  const handleStatusChange = async (id: string, nextStatus: Task['status']) => {
    try {
      const res = await fetch(`${API_BASE}/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!res.ok) throw new Error('Không thể cập nhật trạng thái');
      await fetchTasks();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Lỗi khi cập nhật trạng thái';
      showFeedback(message, 'error');
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/tasks/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Không thể xóa task');
      showFeedback('Đã xóa công việc.', 'success');
      await fetchTasks();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Lỗi khi xóa task';
      showFeedback(message, 'error');
    }
  };

  return (
    <div>
      {/* Create Task Form */}
      <div className="create-task-panel">
        <h3 style={{ marginBottom: '0.75rem', fontSize: '1rem', fontWeight: 600 }}>
          ➕ Thêm công việc mới (Feature Demo)
        </h3>
        <form onSubmit={handleCreateTask} className="create-task-form">
          <div className="form-row">
            <input
              type="text"
              className="form-input"
              placeholder="Tiêu đề công việc (ví dụ: Tạo component Navigation)..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />
            <select
              className="form-input"
              style={{ maxWidth: '140px' }}
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as Task['priority'])}
            >
              <option value="low">Độ ưu tiên: Thấp</option>
              <option value="medium">Độ ưu tiên: Vừa</option>
              <option value="high">Độ ưu tiên: Cao</option>
            </select>
          </div>
          <div className="form-row">
            <input
              type="text"
              className="form-input"
              placeholder="Mô tả chi tiết (tùy chọn)..."
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
            />
            <button type="submit" className="btn-primary">
              Tạo task
            </button>
          </div>
        </form>
      </div>

      {feedback && (
        <div
          role="status"
          aria-live="polite"
          style={{
            padding: '0.75rem 1rem',
            background: feedback.type === 'error' ? 'rgba(244, 63, 94, 0.2)' : 'rgba(34, 197, 94, 0.2)',
            color: feedback.type === 'error' ? '#f43f5e' : '#22c55e',
            borderRadius: '8px',
            marginBottom: '1rem',
            fontSize: '0.9rem',
          }}
        >
          {feedback.type === 'error' ? '⚠️' : '✅'} {feedback.text}
        </div>
      )}

      {error && (
        <div style={{ padding: '1rem', background: 'rgba(244, 63, 94, 0.2)', color: '#f43f5e', borderRadius: '8px', marginBottom: '1rem' }}>
          ⚠️ {error} - Đảm bảo backend đang chạy tại port 3000!
        </div>
      )}

      {loading ? (
        <p style={{ color: 'var(--text-secondary)' }}>Đang tải công việc...</p>
      ) : (
        <div className="board-layout">
          {COLUMNS.map((col) => {
            const columnTasks = tasks.filter((t) => t.status === col.id);
            return (
              <div key={col.id} className="column">
                <div className="column-header">
                  <div className="column-title">
                    <span>{col.icon}</span>
                    <span>{col.label}</span>
                  </div>
                  <span className="column-count">{columnTasks.length}</span>
                </div>

                <div className="task-list">
                  {columnTasks.map((task) => (
                    <div key={task.id} className="task-card">
                      <div className="task-card-header">
                        <span className="task-card-title">{task.title}</span>
                      </div>

                      {task.description && (
                        <p className="task-card-desc">{task.description}</p>
                      )}

                      <div className="task-card-footer">
                        <span className={`priority-tag priority-${task.priority}`}>
                          {task.priority}
                        </span>

                        <div className="action-buttons">
                          {task.status !== 'todo' && (
                            <button
                              className="btn-icon"
                              title="Chuyển về trước"
                              onClick={() =>
                                handleStatusChange(
                                  task.id,
                                  task.status === 'done' ? 'in_progress' : 'todo'
                                )
                              }
                            >
                              ◀
                            </button>
                          )}
                          {task.status !== 'done' && (
                            <button
                              className="btn-icon"
                              title="Chuyển tiếp theo"
                              onClick={() =>
                                handleStatusChange(
                                  task.id,
                                  task.status === 'todo' ? 'in_progress' : 'done'
                                )
                              }
                            >
                              ▶
                            </button>
                          )}
                          <button
                            className="btn-icon btn-delete"
                            title="Xóa"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {columnTasks.length === 0 && (
                    <div style={{ color: 'var(--text-secondary)', textAlign: 'center', margin: 'auto 0', fontSize: '0.85rem' }}>
                      Chưa có công việc nào
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TaskBoard;
