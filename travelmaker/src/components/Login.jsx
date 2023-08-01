import React from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import Membership from './Membership';

const Login = () => {
  return (
    <div className='login_bg'>
      <div className='login_bgvid'>
        <video className='login_vid' autoPlay muted loop><source src='video/video1.mp4' /></video>
      </div>

      {/* <h1 className='title_name'>Travel Maker</h1> */}
      <img className='logo_img' src='img/TM.png' ></img>

      <div className='login_box'>

        <input className='input' placeholder='아이디'></input>
        <input type='password' className='input' placeholder='비밀번호'></input>

        <hr />
        <button className='login_bt'>로그인</button>
        <Link to='/membership'><button>회원가입</button></Link>
        <Routes>
          <Route path='/membership' element={<Membership/>}></Route>
        </Routes>

      </div>
    </div>
  )
}

export default Login