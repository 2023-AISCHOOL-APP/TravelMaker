import React, { useState, useRef, useEffect } from 'react'
import { BiXCircle, BiPlusCircle } from "react-icons/bi";
import { db } from '../firebase-config';
import { getDoc, doc, collection, getDocs, setDoc } from 'firebase/firestore'

function DragNDrop({setPlane}) {
  // 날짜 개수에 맞게 일정 리스트 생성
  const dateRan = sessionStorage.getItem('dateRan')
  const startDate = sessionStorage.getItem('startDate')
  const endDate = sessionStorage.getItem('endDate')
  const splitEndDate = endDate.split('-')
  const [lastEndDate, setLastEndDate] = useState(parseInt(splitEndDate[2]))
  const data = [];
  for (let i = 1; i < parseInt(dateRan) + 2; i++) {
    data.push({ title: `DAY ${i}`, items: [] })
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
  const [titleNum,setTitleNum] = useState(list.length);
  const handleCloseGroup = (index) => {
    setLastEndDate(lastEndDate - 1);
    setTitleNum(titleNum-1);
    setGroupStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = false;
      return newStates;
    });
  };
  
  const handleAddGroupClick = () => {
    setLastEndDate(lastEndDate + 1);
    setTitleNum(titleNum+1)
    setList((prevList) => [
      ...prevList,
      {
        title: `DAY ${titleNum+1}`,
        items: [],
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

  const [newItem, setNewItem] = useState("");
  const [planeList, setPlaneList] = useState([{title:'Day1', items:['일정없음']}]);

  const handleAddItem = (groupIndex) => {
    setBlank('');
    setList((prevList) => {
      const newList = [...prevList];
      newList[groupIndex].items.push(newItem);
      setPlaneList(newList)
      setPlane(newList)
      return newList;
    });
  };
  console.log(planeList[0].items);
  const [blank, setBlank] = useState()
  const handleKeyDown = (e, grpI) => {
    if (e.key === 'Enter') {
      handleAddItem(grpI);
    }else{
      setBlank();
    }
  };

  const reset = ()=>{
    sessionStorage.setItem('endDate', '0000-00-00')
    sessionStorage.setItem('startDate', '0000-00-00')
    sessionStorage.setItem('dateRan', 0)
    window.location.replace('/scheduleform')
  }

  return (
    <div className='kanban-container'>
      <div className='kanban-add-box'>
        <div className='kanban-add-btn b' onClick={handleAddGroupClick}>
          Add
        </div>
        <div className='kanban-reset-btn b' onClick={reset}>
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
              <input className='kanban-add-input' type="text" value={blank}  onChange={(e) => { setNewItem(e.target.value) }} onKeyDown={(e)=> handleKeyDown(e, grpI)}/>
              <BiPlusCircle className='add-dnd-item dndHover' size='25' onClick={() => handleAddItem(grpI)}>+</BiPlusCircle>
              <BiXCircle className='remove-grp-btn dndHover' size='25' onClick={() => handleCloseGroup(grpI)}>X</BiXCircle>
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
                <BiXCircle size='25' className='remove-dnd-item' onClick={() => handleCloseItem(grpI, itemI)}>X</BiXCircle>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DragNDrop