import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../firebase-config';
import { getDoc, doc, collection, getDocs } from 'firebase/firestore'
import MapParty from './MapParty';
import MyscheduleForm from './MyscheduleForm';


function PartyMember() {
  const nick = sessionStorage.getItem('nick')
  const localName = sessionStorage.getItem('localName')
  const [mapOpen, setMapOpen] = useState(false); // 맵 모달창 노출 여부 state

  // 게시판 정보 받아오기
  const [scheduleData, setScheduleData] = useState([{}])
  const getSchData = async (e) => {
    const usersCollectionRef = collection(db, '게시판');
    const userSnap = await getDocs(usersCollectionRef);
    const data = userSnap.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    let dataList = [];
    if (localName === "전체") {
      for (let i = 0; i < data.length; i++) {
        if (data[i].userNick != nick) {
          dataList.push(data[i])
        }
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        if (data[i].localName === localName && data[i].userNick != nick) {
          dataList.push(data[i])
        }
      }
    }
    setScheduleData(dataList)
  }

  useEffect(() => {
    getSchData();
  }, [])

  // 추천보기 데이터 골라내기
  const [schData, setSchData] = useState([]);
  const searchSchedule = ()=>{
    let dataList = [];
    try{
    for(let i=0; i<scheduleData.length; i++){
      for(let j=0; j<matchUsers.length; j++){
        if(scheduleData[i].userNick === matchUsers[j]){
          dataList.push(scheduleData[i])
        }
      }
    }
    setSchData(dataList);
    console.log(dataList)
    }catch{
      console.log("이상무!");
    }
  }

  useEffect(()=>{
    searchSchedule();
    console.log(schData);
  },[scheduleData])

  // 지역선택 모달창 노출
  const showMap = () => {
    setMapOpen(true);
  }

  const matchNum = sessionStorage.getItem('matchNum')
  let matchUsers = [];
  for (let i = 0; i < matchNum; i++) {
    matchUsers.push(sessionStorage.getItem(`matchUsers${i}`))
  }
  console.log(matchUsers);

  const [allOrRec, setAllOrRec] = useState(true); // 전체보기 혹은 추천보기
  const all = () => { setAllOrRec(true); } // 전체보기
  const rec = () => {
    setAllOrRec(false);
  } // 추천보기

  return (
    <div className='detail-container'>
      <div className='detail-box'>
        <div className='recommend-menu'>
          <div className='recommend-select'>
            <input id='my_t' type="radio" name="my_sch" onClick={all} />
            <label className='my_text b' for='my_t' >전체보기</label>
            <input id='my_s' type="radio" name="my_sch" onClick={rec} />
            <label className='my_text b' for='my_s'>추천보기</label>
          </div>
        </div>

        <div className='detail-application'>
          <div className='detail-select'>
            <div className="member-local-select b" onClick={showMap}>지역선택</div>
            {mapOpen && <MapParty setMapOpen={setMapOpen} />}
            <div className='date-container'>
              <div className="date-box">
                <p className="date-select">출발일</p>
                <input type='date'></input>
              </div>
              <div className="date-box">
                <p className="date-select">도착일</p>
                <input type='date'></input>
              </div>
            </div>
          </div>
        </div>
        <div className="pm-local-box">
          <div className='pm-local-select'>선택 지역 |</div>
          <div className="pm-local-name-box">
            <span className="pm-local-name">{localName}</span>
          </div>
        </div>
        <div className='detail-form'>
          {allOrRec && allOrRec ? <>
            {scheduleData.map(item => <MyscheduleForm schData={item} key={item.title} />)}
          </> :
            <>
              {schData.length != 0 ?
                <>
                  {schData.map(item => <MyscheduleForm schData={item} key={item.title} />)}
                </> :
                <div className='partymember-none-text'>
                  <div>추천 멤버가 없습니다 ㅜㅜ</div>
                </div>}
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default PartyMember