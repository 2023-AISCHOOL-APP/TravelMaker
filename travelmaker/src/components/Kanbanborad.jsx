import React, { useEffect, useState } from 'react';
import './css/Kanbanboard.css';
import DragNDrop from './DragNDrop';

const Kanbanborad = ({setPlane}) => {
  return (
    <div className="kanban-board">
      <DragNDrop setPlane={setPlane}/>
    </div>
  )
}

export default Kanbanborad