import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PartyDetail from './PartyDetail';
import { useState } from 'react';
import { db } from '../firebase-config';
import { getDoc, doc, collection, getDocs } from 'firebase/firestore'

const MyscheduleForm = ({schData}) => {

  // 세부 일정 모달창 띄우기
  const [detailSchOpen, setDetailSchOpen] = useState(false); // 맵 모달창 노출 여부 state

  // 모달창 노출
  const showDetailSch = () => {
    setDetailSchOpen(true);
  }
  // 세부 일정 모달 끝

  // 게시판 정보 받아오기
  const [userScore, setUserScore] = useState(`${36}℃`)
  const getScore = async (e) => {
    const usersCollectionRef = collection(db, 'users');
    const userSnap = await getDocs(usersCollectionRef);
    const data = userSnap.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    // 파티장 온도 데이터 가져오기
    let score = 0;
    for(let i = 0; i<data.length; i++){
      const searchScore = Object.keys(data[i]).filter((key) => {
        return data[i][key] === schData.userNick;
      });
      if(searchScore.length != 0){
        score = data[i].score
      }
    }
    if(score != undefined){
      setUserScore(`${36+score}℃`)
    }else{
      setUserScore(`${36}℃`)
    }
  }

  console.log(schData.score);
  const [tagsList,setTagsList] = useState([])

  useEffect(()=>{
    getScore();
    if(schData.tags != undefined){
      setTagsList(schData.tags);
    }else{
      setTagsList(['']);
    }
  },[])

  console.log(tagsList);
  return (
    <div>
      <Link onClick={showDetailSch} className='detail-list-box'>
        <div className='detail-list'>
          <div className='detail-list-title'>{schData.title}</div>
          <div className="de-li-info-box">
            <div className='detail-list-author'>파티장 | {schData.userNick} 🌡️{userScore}</div>
            <div className='in-list-info-box'>
              <div className='detail-list-location'>여행지역 | {schData.localName}</div>
              <div className='detail-list-num'>모집인원 | {schData.members}명</div>
            </div>
            <div className='detail-list-date-box'>
              <div className="detail-list-date-text">여행기간 |</div>
              <div className="detail-list-date">{schData.startDate} ~ {schData.endDate}</div>
            </div>
          </div>
          <div className="detail-list-category">
            {/* 최대 10개까지 */}
            {tagsList.map((data) => {
          return (<div className='list-category-icon'>{data}</div>)})}
          </div>
        </div>
      </Link>
      {detailSchOpen && <PartyDetail setDetailSchOpen={setDetailSchOpen} schData={schData} userScore={userScore} tagsList={tagsList}/>}
    </div>
  )
}

export default MyscheduleForm