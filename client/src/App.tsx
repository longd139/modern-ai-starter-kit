import { useState, useEffect } from 'react';
import TaskBoard from './components/TaskBoard.js';
import './App.css';

export function App() {
  const [healthStatus, setHealthStatus] = useState<{ status: string; uptime: number } | null>(null);

  useEffect(() => {
    fetch('/health')
      .then((res) => res.json())
      .then((data) => setHealthStatus(data))
      .catch(() => setHealthStatus(null));
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-section">
          <h1>🚀 Team Task Board</h1>
          <p>Fullstack Template chuẩn cho Course 4: The Modern AI Software Developer</p>
        </div>

        <div className="header-badges">
          {healthStatus ? (
            <div className="status-badge">
              <span className="dot" />
              <span>Backend Connected (Uptime: {healthStatus.uptime}s)</span>
            </div>
          ) : (
            <div className="status-badge error">
              <span className="dot" />
              <span>Backend Disconnected</span>
            </div>
          )}
        </div>
      </header>

      <main>
        <TaskBoard />
      </main>
    </div>
  );
}

export default App;
