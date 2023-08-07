import React, { useState, useRef } from 'react'

function DragNDrop() {
  // 날짜 개수에 맞게 일정 리스트 생성
  const dateRan = sessionStorage.getItem('dateRan')
  const startDate = sessionStorage.getItem('startDate')
  const endDate = sessionStorage.getItem('endDate')
  const splitEndDate = endDate.split('-')
  const [lastEndDate, setLastEndDate] = useState(parseInt(splitEndDate[2]))
  console.log(dateRan);
  const data = [];
  for (let i = 1; i < parseInt(dateRan) + 2; i++) {
    data.push({ title: `DAY ${i}`, items: ['1', '2', '3'] })
  }

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
    setLastEndDate(lastEndDate - 1);
    setGroupStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = false;
      return newStates;
    });
  };

  const handleAddGroupClick = () => {
    setLastEndDate(lastEndDate + 1);
    setList((prevList) => [
      ...prevList,
      {
        title: `DAY ${prevList.length + 1}`,
        items: ['1'],
      },
    ]);
    setGroupStates((prevStates) => [...prevStates, true]);
  };


  const handleCloseItem = (groupIndex, itemIndex) => {
    setList((prevList) => {
      const newList = [...prevList];
      newList[groupIndex].items.splice(itemIndex, 1);
      return newList;
    });
  };

  const handleAddItem = (groupIndex) => {
    setList((prevList) => {
      const newList = [...prevList];
      newList[groupIndex].items.push(`New Item`);
      return newList;
    });
  };

  const reset = ()=>{
    window.location.replace('/scheduleform')
  }

  return (
    <div className='kanban-container'>
      <div className='kanban-add-box'>
        <div className='kanban-add-btn b' onClick={handleAddGroupClick}>
          Add
        </div>
        <div className='kanban-add-btn b' onClick={reset}>
          Reset
        </div>
        <div className='kanban-add-date'>출발일 : {startDate}</div>

        <div className='kanban-add-date'>도착일 : {splitEndDate[0]+'-'+splitEndDate[1]+'-'+lastEndDate}</div>
      </div>
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
              <button className='remove-grp-btn' onClick={() => handleCloseGroup(grpI)}>X</button>
            </div>
            {grp.items.map((item, itemI) => (
              <div
                draggable
                onDragStart={(e) => { handleDragStart(e, { grpI, itemI }) }}
                onDragEnter={dragging ? (e) => { handleDragEnter(e, { grpI, itemI }) } : null}
                key={item}
                className={dragging ? getStyles({ grpI, itemI }) : 'dnd-item'}
              >
                <div className="dnd-item-icon">-</div>
                <div className="dnd-item-text">
                  {item}
                </div>
                <button className='remove-dnd-item' onClick={() => handleCloseItem(grpI, itemI)}>X</button>
              </div>
            ))}
            <button className='add-dnd-item' onClick={() => handleAddItem(grpI)}>+</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DragNDrop