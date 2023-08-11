import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import MyscheduleForm from './MyscheduleForm';
import { db } from '../firebase-config';
import { getDoc, doc, collection, getDocs } from 'firebase/firestore'
import PartyMemberList from './PartyMemberList';



const Myschedule = () => {
  const nav = useNavigate();
  const nick = sessionStorage.getItem('nick');
  const selectMy = sessionStorage.getItem('select_my')
  const [myOrApp, setMyOrApp] = useState(true);
  
  // 게시판 정보 받아오기
  const [scheduleData, setScheduleData] = useState({})
  const getSchData = async (e) => {
    const usersCollectionRef = collection(db, '게시판');
    const userSnap = await getDocs(usersCollectionRef);
    const data = userSnap.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    setScheduleData(data);
  }

  useEffect(()=>{
    getSchData();
  },[])

  useEffect(() => {
    if (selectMy != null) {
      setMyOrApp(true)
    } else {
      setMyOrApp(false)
      sessionStorage.setItem('select_my', 'my')
    }
  }, [])

  const my = () => {
    setMyOrApp(true);
  }
  const app = () => {
    setMyOrApp(false);
    sessionStorage.setItem('select_my', 'my')
  }

  const [schData, setSchData] = useState([]);
  const searchSchedule = ()=>{
    let dataList = [];
    try{
    for(let i=0; i<scheduleData.length; i++){
      if(scheduleData[i].userNick === nick){
        dataList.push(scheduleData[i])
      }
    }
    setSchData(dataList);
    // console.log(dataList)
    }catch{
      console.log("이상무!");
    }
  }

  useEffect(()=>{
    searchSchedule();
    console.log(schData);
  },[scheduleData])

  // 데이터 베이스에서 관광지 데이터 불러오면서 일정 작성페이지로 이동
  const localName = '강원도강릉시';
  const getLocalData = async () => {
    sessionStorage.setItem('dateRan', 0)
    sessionStorage.setItem('startDate', '0000-00-00')
    sessionStorage.setItem('endDate', '0000-00-00')
    const usersCollectionRef = collection(db, localName);
    const userSnap = await getDocs(usersCollectionRef);
    const data = userSnap.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    sessionStorage.setItem('localName', localName)
    nav('/scheduleform', { state: data })
  }

  return (
    <div className='my-schedule-container'>
      <div className='my-schedule-box'>
        <div className='my-schedule-menu'>
          <div className='my-schedule-select'>
            <div className='my_box'>
              <input id='my_t' type="radio" name="my_sch" onClick={my} />
              <label className='my-sche-btn b' for='my_t' >내가 등록한 일정</label>
              <input id='my_s' type="radio" name="my_sch" onClick={app} />
              <label className='my-sche-btn btn-b b' for='my_s'>신청자 목록</label>
            </div>

          </div>
        </div>
        {/* 클래스명에 detail 붙은 디자인은 PartyMember.css에 있음 */}
        {myOrApp&&myOrApp ? 
        <div className='my-schedule-form'>
            {schData.length != 0 ?
              <>
                {schData.map(item => <MyscheduleForm schData={item} key={item.title} />)}
              </> :
              <div className='my-schedule-none-box'>
                <div className='my-schedule-none-text'>등록된 일정이 없습니다!</div>
                <button className='my-schedule-none-btn b' onClick={getLocalData}>일정등록</button>
              </div>}
          </div> :
          <div className='my-schedule-form'>
            {schData.map(item => <PartyMemberList schData={item} key={item.title} />)}
          </div>}
      </div>
    </div>
  )
}

export default Myschedule