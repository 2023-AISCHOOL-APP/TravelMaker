import { React, useState, forwardRef, useEffect } from 'react'
import { BiSearch } from "react-icons/bi";

import Kanbanborad from './Kanbanborad';
import Map from './Map';
import Registration from './Registration';

// 지역정보
import LocalData from './LocalData';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../firebase-config';
import { getDoc, doc, collection, getDocs, setDoc } from 'firebase/firestore'

const ScheduleForm = () => {
  const localArr = useLocation().state // 지역정보 받아오기
  const localName = sessionStorage.getItem('localName')// 지역이름 받아오기
  const [startDate, setStartDate] = useState(""); // 출발일
  const [endDate, setEndDate] = useState(""); // 도착일
console.log(localArr);
  const [regiWrite, setRegiWrite] = useState(false);
  const goToRegiWrite = () => {
    setRegiWrite(true)
  }

  const [mapOpen, setMapOpen] = useState(false); // 맵 모달창 노출 여부 state

  // 모달창 노출
  const showMap = () => {
    setMapOpen(true);
  }

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
  const [search, setSearch] = useState(true)
  const [obj, setObj] = useState()
  let obList = [];
  const searchData = () => {
    obList=[];
    for (let i = 0; i < localArr.length; i++) {
      const localTitle = [localArr[i].title];
      const filterLocal = (query) => {
        return localTitle.filter((el) =>
        el.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1)
      }
      if(filterLocal(userInput).length!=0){
          obList.push(localArr[i])
          console.log(filterLocal(userInput));
      }
      }
      opper();
    }

    const opper = ()=>{
      if (obList.length!=0) {
        setSearch(false);
        setObj(obList);
        console.log('F');
      } else {
        setSearch(true);
        console.log('T');
        alert("검색결과가 없습니다.")
      }
      console.log(obList);
    }

  // 엔터키 입력시 검색실행
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchData();
      setUserInput("");
    }
  };

    // 날짜 길이 설정
    const setDateRan = ()=>{
      sessionStorage.setItem('dateRan', Math.abs(parseInt(endDate.split('-')[2])-parseInt(startDate.split('-')[2])))
      sessionStorage.setItem('startDate', startDate)
      sessionStorage.setItem('endDate', endDate)
      console.log(Math.abs(endDate-startDate));
      window.location.replace('/scheduleform')
    }
    
  return (
    <div className='schedule-container'>
      <nav className='nav-list'>
        <div className="local-select b" onClick={showMap}>지역선택</div>
        {mapOpen && <Map setMapOpen={setMapOpen} />}
        <div className='date-container'>
          <div className='date-box'>
            <p className='date-select'>출발일</p>
            <input type='date'  onChange={(e) => { setStartDate(e.target.value) }}></input>
          </div>
          <div className='date-box'>
            <p className='date-select'>도착일</p>
            <input type='date' onChange={(e) => { setEndDate(e.target.value) }}></input>
          </div>
          <button className='date-create b' onClick={setDateRan}>일정 생성</button>
          <button className='go-next b' onClick={goToRegiWrite}>다음</button>
        </div>
      </nav>
      
      <div className='schedule-box'>
        <div className='info-box'>
          <div className="sch-local-box">
            <div className='sch-local-select'>선택 지역</div>
            <div className='sch-local-name-box'>
              <span className="sch-local-name">{localName}</span>
            </div>
          </div>
          <div className='search-area'>
            <input className='search-box' placeholder='검색어를 입력하세요.' value={userInput} onChange={(e) => { setUserInput(e.target.value) }} onKeyDown={handleKeyDown}></input>
            <div className='search-icon-box'>
              <BiSearch className='search-icon' size='25' onClick={searchData}>검색</BiSearch>
            </div>
          </div>
          {/* 창 크기 줄었을 때 안보임 */}
          <div className='place-info-area'>
            {search ? 
            <>
              {localArr&&localArr.map(item=><LocalData local={item} key={item.title}/>)}
            </>:
            <>
             {obj&&obj.map(item=><LocalData local={item} key={item.title}/>)}
             </>}
          </div>
        </div>
        <div className='schedule-form'>
          {/* <div className='schedule-list'>day1</div>
          <div className='schedule-list'>+</div> */}
          {regiWrite ? <Registration/> : <Kanbanborad/>}
        </div>
      </div>
    </div>
  )
}

export default ScheduleForm