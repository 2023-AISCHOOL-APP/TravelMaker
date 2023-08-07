import React from 'react';
import './css/Kanbanboard.css';
import DragNDrop from './DragNDrop';

const data = [
  {title: 'DAY 1', items: ['강릉 3.1운동 기념공원','2','3']},
  {title: 'DAY 2', items: ['4','5']},
  {title: 'DAY 3', items: ['6','7']},
  {title: 'DAY 4', items: ['8','9']},
]

const Kanbanborad = () => {
  return (
    <div className="kanban-board">
      <DragNDrop data={data}/>
    </div>
  )
}

export default Kanbanborad