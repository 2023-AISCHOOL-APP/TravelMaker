import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../firebase-config';
import { getDoc, doc, collection, getDocs, setDoc } from 'firebase/firestore'
import Review from './Review';
import MyscheduleForm from './MyscheduleForm'
import { useEffect } from 'react';
import FinishedSch from './FinishedSch';

const Application = () => {
  const nav = useNavigate();
  const nick = sessionStorage.getItem('nick')
  const [applyOrDone, setAppOrDone] = useState(true);

  const goToApply = () => {
    setAppOrDone(true)
  }

  const goToDone = () => {
    setAppOrDone(false)
  }

  // 게시판 정보 받아오기
  
  const [scheduleData, setScheduleData] = useState([{}])
  const [finishedData, setFinishedData] = useState([{}])
  const getSchData = async (e) => {
    const usersCollectionRef = collection(db, '게시판');
    const userSnap = await getDocs(usersCollectionRef);
    const data = userSnap.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    let appDataList = [];
    let finishedDataList = [];
    for (let i = 0; i < data.length; i++) {
      if(data[i].applicantList === undefined){
        data[i].applicantList = []
      }else if(data[i].finishedList === undefined){
        data[i].finishedList = []
      }
      if (data[i].userNick != nick && data[i].applicantList.indexOf(nick) != -1 && data[i].finishedList.indexOf(nick) === -1) {
        appDataList.push(data[i])
      }
      if((data[i].state === '동행완료' || data[i].state === '리뷰완료') && data[i].userNick != nick && data[i].finishedList.indexOf(nick) != -1){
        finishedDataList.push(data[i])
      }
    }
    setScheduleData(appDataList)
    setFinishedData(finishedDataList)
  }

  useEffect(()=>{
    getSchData();
  },[])

  const toParty = ()=>{
    nav('/partymember')
  }

  return (
    <div className='app-container'>
      <div className='app-box'>
        <div className='app-application'>
          <div className='app-schedule-select'>

            {/* <input id='my_t' type='radio'>
                    <label for='my_t' className='my_text'>내가 작성한 글</label>
                  </input>
                  <input id ='my_s' type='radio'>
                    <label for ='my_s' className='my_text'>신청한 사람 몰록</label>
                  </input> */}
            <div className='my_box'>
              <input id='my_t' type="radio" name="my_sch" />
              <label className='my-app-text-a b' for='my_t' onClick={goToApply}>내가 신청한 여행</label>
              <input id='my_s' type="radio" name="my_sch" />
              <label className='my-app-text-b b' for='my_s' onClick={goToDone}>다녀온 여행</label>
            </div>

          </div>
        </div>
        {applyOrDone ?
        <>
          {scheduleData[0] != undefined ?
          <div className='my-schedule-form'>
          {scheduleData.map(item => <MyscheduleForm schData={item} key={item.title} />)}
          </div>
          :
          <div className='application-none-box'>
                <div className='application-none-text'>신청한 일정이 없습니다!</div>
                <button className='application-none-btn b' onClick={toParty}>일정보기</button>
              </div>}
          </>
           :
          <div className='my-schedule-form'>
            {finishedData.map(item => <FinishedSch schData={item} key={item.title} />)}
          </div>
        }
      </div>
    </div>
  )
}
export default Application