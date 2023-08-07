import React, { useEffect, useState } from 'react';
import './css/Kanbanboard.css';
import DragNDrop from './DragNDrop';

const Kanbanborad = () => {
  return (
    <div className="kanban-board">
      <DragNDrop/>
    </div>
  )
}

export default Kanbanborad