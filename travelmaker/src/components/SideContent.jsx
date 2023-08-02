import React from 'react'
import { Link } from 'react-router-dom'

const SideContent = () => {
  return (
    <div className='side-content-container'>
      <div className='side-id-box'>
        <h2 className='side-id-text'>아이디</h2>
        <p>로그아웃</p>
      </div>
      <div className='side-list-box'>
        <div className='side-leader-box'>
          <h3>파티장</h3>
          <Link to='/myschedule'>
            <li>내가 작성한 글</li>
          </Link>
          <Link to='/myschedule'>
            <li>신청한 사람</li>
          </Link>
        </div>
        <div className='side-crew-box'>
          <h3>파티원</h3>
          <li>신청목록</li>
        </div>
      </div>
    </div>
  )
}

export default SideContent