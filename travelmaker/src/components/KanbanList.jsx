import React from 'react';
import './css/KanbanList.css';

const KanbanList = ({title}) => {
  return (
    <div className="kanban-list">
      <div className="kanban-list-title">{title}</div>
      <div className="kanban-list-cards">
        {/* 카드 컴포넌트들 */}
      </div>
    </div>
  )
}

export default KanbanList