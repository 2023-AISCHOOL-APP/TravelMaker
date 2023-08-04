import React from 'react';
import './css/Kanbanboard.css';
import KanbanList from './KanbanList';

const Kanbanborad = () => {
  return (
    <div className="kanban-board">
      <KanbanList title="DAY 1" />
      <KanbanList title="DAY 2" />
      <KanbanList title="DAY 3" />
    </div>
  )
}

export default Kanbanborad