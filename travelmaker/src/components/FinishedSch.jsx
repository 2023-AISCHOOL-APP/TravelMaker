import React from 'react'
import { useState } from 'react';
import Review from './Review';

function FinishedSch({schData}) {
    // 리뷰 모달 띄우기
    const [reviewOpen, setReviewOpen] = useState(false); // 맵 모달창 노출 여부 state

    // 모달창 노출
    const showReview = () => {
      setReviewOpen(true);
    }
    // 리뷰 모달 끝
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
      <div className='write-review-btn b' onClick={showReview}>리뷰쓰기</div>
      {reviewOpen && <Review setReviewOpen={setReviewOpen} />}
    </div>
  )
}

export default FinishedSch