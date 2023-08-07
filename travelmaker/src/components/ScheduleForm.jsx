import { React, useState, forwardRef, useEffect } from 'react'

// 달력 라이브러리
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';

// kanban 테스트
import Kanbanborad from './Kanbanborad';

// 지역정보
import LocalData from './LocalData';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../firebase-config';
import { getDoc, doc, collection, getDocs, setDoc } from 'firebase/firestore'

const ScheduleForm = () => {
  const localArr = useLocation().state
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  // 데이터 베이스에서 모든 데이터 불러오기
  const [local, setLocal] = useState({})
  const getData = async () => {
    const usersCollectionRef = collection(db, '강원도');
    const userSnap = await getDocs(usersCollectionRef);
    const data = userSnap.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    setLocal(data);
  }
  useEffect(()=>{
    getData();
  },[])
  
  // 검색어와 지역 데이터 비교
  const [userInput, setUserInput] = useState("")
  const [obList, setObList] = useState([]);

  const searchData = () => {
    setObList([]);
    const addObject = (newList)=>{
      setObList([...obList, newList])
     }
    for (let i = 0; i < localArr.length; i++) {
      const localTitle = [];
      localTitle.push(localArr[i].title);
      const filterLocal = (query) => {
        return localTitle.filter((el) =>
        el.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1)
      }
      if(filterLocal(userInput).length!=0){
          addObject(localArr[i]);
      }
      }
      console.log(obList);
    }

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
            <input className='search-box' placeholder='검색어를 입력하세요.' onChange={(e) => { setUserInput(e.target.value) }}></input>
            <button onClick={searchData}>검색</button>
          </div>
          {/* 창 크기 줄었을 때 안보임 */}
          <div className='place-info-area'>
          {localArr&&localArr.map(item=><LocalData local={item} key={item.title}/>)}
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