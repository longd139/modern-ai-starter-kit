import React from 'react';
import TaskBoard from '../components/TaskBoard.js';

export const BoardPage: React.FC = () => {
  return (
    <div className="board-page">
      <TaskBoard />
    </div>
  );
};

export default BoardPage;
