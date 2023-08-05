import { React, useState, forwardRef, useEffect } from 'react'
import { db } from '../firebase-config';
import { getDoc, doc, collection, getDocs, setDoc } from 'firebase/firestore'

// 달력 라이브러리
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';

// kanban 테스트
import Kanbanborad from './Kanbanborad';
import LocalData from './LocalData';
import { useLocation } from 'react-router-dom';

const ScheduleForm = () => {
  const localArr = useLocation().state
  console.log(localArr);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  return (
    <div className='schedule-container'>
      <nav className='nav-list'>
        <li className="local-select">지역선택</li>
        <div className='date-container'>
          <div className='date-box'>
            <p className='date-select'>출발일</p>
            <input type='date'></input>
            {/* <DatePicker
              locale={ko}
              dateFormat="yyyy년 MM월 dd일"

              selected={startDate}
              selectsStart
              onChange={(date) => setStartDate(date)}

              minDate={new Date()}
              startDate={startDate}
              endDate={endDate}

              customInput={<ExampleCustomInput />}
            /> */}
          </div>
          <div className='date-box'>
            <p className='date-select'>도착일</p>
            <input type='date'></input>
            {/* <DatePicker 
              locale={ko}
              dateFormat="yyyy년 MM월 dd일"

              selected={endDate}
              selectsEnd
              onChange={(date) => setEndDate(date)}

              minDate={startDate}
              startDate={startDate}
              endDate={endDate}

              customInput={<ExampleCustomInput />}
            /> */}
          </div>
        </div>
      </nav>
      <div className='schedule-box'>
        <div className='info-box'>
          <div className='search-area'>
            <input className='search-box' placeholder='검색어를 입력하세요.'></input>
          </div>
          {/* 창 크기 줄었을 때 안보임 */}
          <div className='palce-info-area'>
          {localArr&&localArr.map(item=><LocalData local={item} key={item.num}/>)}
          </div>
        </div>
        <div className='schedule-form'>
          {/* <div className='schedule-list'>day1</div>
          <div className='schedule-list'>+</div> */}
          <Kanbanborad/>
        </div>
      </div>
    </div>
  )
}

export default ScheduleForm