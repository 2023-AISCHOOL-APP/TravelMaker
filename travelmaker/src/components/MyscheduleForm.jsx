import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const MyscheduleForm = ({schData}) => {
  const nav = useNavigate();
  const toDetail = ()=>{
    nav('/partydetail', {state: schData})
  }

  return (
    <div onClick={toDetail}>
      <Link className='my-sche-list-box'>
        <div className='my-sche-list'>
          <div className='detail-list-title'>{schData.title}</div>
          <div className="de-li-info-box">
            <div className='detail-list-author'>파티장 | {schData.userNick}</div>
            <div className='detail-list-date-box'>
              <div className="detail-list-date-text">여행기간 |</div>
              <div className="detail-list-date">{schData.startDate} ~ {schData.endDate}</div>
            </div>
          </div>
          <div className="detail-list-category">
            <div className='list-category-icon'>🚗차</div>
            <div className='list-category-icon'>🚌버스</div>
            <div className='list-category-icon'>👟뚜벅</div>
            <div className='list-category-icon'>🏖️휴양</div>
            <div className='list-category-icon'>🏃외부</div>
            <div className='list-category-icon'>🏛️관광</div>
            <div className='list-category-icon'>🚶‍♂️걷기</div>
          </div>
          <div className='my-sche-list-content'>
            <div className='my-sche-list-content-text'>내용</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default MyscheduleForm