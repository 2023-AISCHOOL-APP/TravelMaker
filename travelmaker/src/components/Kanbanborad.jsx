import React from 'react';
import './css/Kanbanboard.css';
import DragNDrop from './DragNDrop';

const data = [
  {title: 'group 1', items: ['1','2','3']},
  {title: 'group 2', items: ['4','5']},
  {title: 'group 3', items: ['6','7']},
  {title: 'group 4', items: ['8','9']},
]

const Kanbanborad = () => {
  return (
    <div className="kanban-board">
      <DragNDrop data={data}/>
    </div>
  )
}

export default Kanbanborad