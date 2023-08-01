import React from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import Membership from './Membership';

const Login = () => {
  return (
    <div className='login_bg'>
      {/* 배경이 들어갈 자리 */}
      <div className='login_bgvid'>
        <video className='login_vid' autoPlay muted loop><source src='video/video1.mp4' /></video>
      </div>

      {/* <h1 className='title_name'>Travel Maker</h1> */}
      <img className='logo_img' src='이미지 들어갈 부분' ></img>

      <div className='login_box'>

        {/* 로그인 기본정보 입력 */}
        <input className='input' placeholder='아이디'></input>
        <input type='password' className='input' placeholder='비밀번호'></input>

        <hr />
        {/* 버튼 클릭시 화면 이동 */}
        <button className='login_bt'>로그인</button>
        <Link to='/membership'><button>회원가입</button></Link>
      </div>
    </div>
  )
}

export default Login