import React, { useState, useRef } from 'react'

function DragNDrop({ data }) {

  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);

  const [groupStates, setGroupStates] = useState(Array(data.length).fill(true));

  const dragItem = useRef();
  const dragNode = useRef();

  const handleDragStart = (e, params) => {
    console.log('드래그 시작', params);
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener('dragend', handleDragEnd)
    setTimeout(() => {
      setDragging(true);
    }, 0)
  }

  const handleDragEnter = (e, params) => {
    console.log('드래그 입력', params);
    const currentItem = dragItem.current;

    if (e.target !== dragNode.current) {
      console.log('대상이 같지 않음');
      setList(oldList => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[params.grpI].items.splice(params.itemI, 0, newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0])
        dragItem.current = params
        return newList
      })
    }
  }

  const handleDragEnd = () => {
    console.log('드래그 끝');
    setDragging(false);
    dragNode.current.removeEventListener('dragend', handleDragEnd)
    dragItem.current = null;
    dragNode.current = null;
  }

  const getStyles = (params) => {
    const currentItem = dragItem.current;
    if (currentItem.grpI === params.grpI && currentItem.itemI === params.itemI) {
      return 'current dnd-item'
    }
    return 'dnd-item'
  }

  // const handleCloseButtonClick = () => {
  //   const dndContainer = document.querySelector('.dnd-group');
  //   if (dndContainer) {
  //     dndContainer.remove();
  //   }
  // }

  const handleCloseGroup = (index) => {
    setGroupStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = false;
      return newStates;
    });
  };

  const handleAddGroupClick = () => {
    setList((prevList) => [
      ...prevList,
      {
        title: `Group ${prevList.length + 1}`,
        items: [],
      },
    ]);
    setGroupStates((prevStates) => [...prevStates, true]);
  };

  return (

    <div className='kanban-container'>
      <div><button onClick={handleAddGroupClick}>추가</button></div>
      <div className='drag-n-drop'>
        {list.map((grp, grpI) => (
          groupStates[grpI] &&
          <div
            key={grp.title}
            className='dnd-group'
            onDragEnter={dragging && !grp.items.length ? (e) => handleDragEnter(e, { grpI, itemI: 0 }) : null}
          >
            <div className='group-title-box'>
              <div className='group-title'>{grp.title}</div>
              <button onClick={() => handleCloseGroup(grpI)}>X</button>
            </div>
            {grp.items.map((item, itemI) => (
              <div
                draggable
                onDragStart={(e) => { handleDragStart(e, { grpI, itemI }) }}
                onDragEnter={dragging ? (e) => { handleDragEnter(e, { grpI, itemI }) } : null}
                key={item}
                className={dragging ? getStyles({ grpI, itemI }) : 'dnd-item'}
              >
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DragNDrop