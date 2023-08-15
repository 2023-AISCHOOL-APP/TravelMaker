import React, { useEffect } from 'react'
import { useState } from 'react';
import { db } from '../firebase-config';
import { getDoc, doc, collection, getDocs, setDoc } from 'firebase/firestore'
import Review from './Review';

function FinishedSch({schData}) {
  const nick = sessionStorage.getItem('nick');
    // 리뷰 모달 띄우기
    const [reviewOpen, setReviewOpen] = useState(false); // 맵 모달창 노출 여부 state

    // 모달창 노출
    const showReview = () => {
      setReviewOpen(true);
    }
    // 리뷰 모달 끝

  // 파티장 이메일 정보 받아오기
  const [leaderEmail, setLeaderEmail] = useState([])
  const getLeaderData = async (e) => {
    const usersCollectionRef = collection(db, 'users');
    const userSnap = await getDocs(usersCollectionRef);
    const data = userSnap.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    let DataList = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].nickname === schData.userNick) {
        DataList.push(data[i].email)
      }
    }
    setLeaderEmail(DataList)
  }

  const [selectedReviewed,setSelectedReviewed] = useState([])

  useEffect(() => {
    getLeaderData();
    if(schData.reviewedList != undefined){
      setSelectedReviewed(schData.reviewedList);
    }else{
      setSelectedReviewed([]);
    }
  }, [])


  return (
    <div className='done-trip-list'>
      <div className='detail-list-title'>{schData.title}</div>
      <div className="de-li-info-box">
        <div className='detail-list-author'>파티장 | {schData.userNick}</div>
        <div className='detail-list-location'>여행지역 | {schData.localName}</div>
        <div className='detail-list-date-box'>
          <div className="detail-list-date-text">여행기간 |</div>
          <div className="detail-list-date">{schData.startDate} ~ {schData.endDate}</div>
        </div>
      </div>
      {selectedReviewed.indexOf(nick) != -1 ?
      <div className='write-review-btn'>리뷰작성이 완료된 일정</div>
      :
      <div className='write-review-btn b' onClick={showReview}>리뷰쓰기</div>
      }
      {reviewOpen && <Review setReviewOpen={setReviewOpen} schData={schData} leaderEmail={leaderEmail}/>}
    </div>
  )
}

export default FinishedSch