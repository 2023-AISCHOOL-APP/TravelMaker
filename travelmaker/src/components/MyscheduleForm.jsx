import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PartyDetail from './PartyDetail';
import { useState } from 'react';

const MyscheduleForm = ({schData}) => {

  // 세부 일정 모달창 띄우기
  const [detailSchOpen, setDetailSchOpen] = useState(false); // 맵 모달창 노출 여부 state

  // 모달창 노출
  const showDetailSch = () => {
    setDetailSchOpen(true);
  }
  // 세부 일정 모달 끝

  return (
    <div>
      <Link onClick={showDetailSch} className='detail-list-box'>
        <div className='detail-list'>
          <div className='detail-list-title'>{schData.title}</div>
          <div className="de-li-info-box">
            <div className='detail-list-author'>파티장 | {schData.userNick}</div>
            <div className='detail-list-location'>여행지역 | {schData.localName}</div>
            <div className='detail-list-date-box'>
              <div className="detail-list-date-text">여행기간 |</div>
              <div className="detail-list-date">{schData.startDate} ~ {schData.endDate}</div>
            </div>
          </div>
          <div className="detail-list-category">
            {/* 최대 10개까지 */}
            <div className='list-category-icon'>🚗차</div>
            <div className='list-category-icon'>🚌버스</div>
            <div className='list-category-icon'>👟뚜벅</div>
            <div className='list-category-icon'>🏖️휴양</div>
            <div className='list-category-icon'>🏃외부</div>
            <div className='list-category-icon'>🏛️관광</div>
            <div className='list-category-icon'>🚶‍♂️걷기</div>
          </div>
        </div>
      </Link>
      {detailSchOpen && <PartyDetail setDetailSchOpen={setDetailSchOpen} schData={schData}/>}
    </div>
  )
}

export default MyscheduleForm