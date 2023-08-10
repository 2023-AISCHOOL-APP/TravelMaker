import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Main = () => {
  // 로그인한 유저 아이디
  const userID = sessionStorage.getItem('userId')
  const nav = useNavigate();

  // 로그인 상태에 따라 접근권한 부여
  const search = () => {
    if (userID != null) {
      nav('/select')
    } else {
      alert('로그인 후 사용해주세요!')
      nav('/login')
    }
  }
  return (
    <div className='main-container'
      // style={{
      //   backgroundImage: 'url(/images/bgimg.jpg)',
      //   backgroundPosition: 'center',
      //   backgroundRepeat: 'no-repeat',
      //   backgroundSize: '100% 100%',
      // }}
      >
      <div className='main-contant-box'>
        <div>
          <h1 className='main-title'>Travel Mate</h1>
        </div>
        <div>
          <p className='main-text'>새로운 친구와 즐거운 여행을 만들어보세요!</p>
        </div>
        {/* 로그인 상태에 따라 동행찾기 접근 권한 설정 */}
        <div onClick={search}>
          <Link>
            <a className='main_btn click-b b' >동행찾기</a>
          </Link>
        </div>
      </div>
      <div className='main-img-box'>
        <img src='images/bgimg.jpg' className='main-img'></img>
      </div>
    </div>
  )
}

export default Main