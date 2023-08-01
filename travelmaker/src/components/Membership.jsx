import React from 'react'
import Preference from './Preference'
import { Link, Routes, Route } from 'react-router-dom'

const Membership = () => {

  return (
    <div className='membership_bg'>
      {/* 배경이 들어갈 자리 */}
      <div className='membership_bgvid'>
        <video className='membership_vid' autoPlay muted loop><source src='video/video2.mp4' /></video>
      </div>


      {/* <div className='membership_logo' > */}
      <img className='membership_img' src='img/TM.png'></img>
      {/* </div> */}

      <div className='membership_box'>
        <div>
          {/* 회원가입 정보 입력 */}
          <div className='membership_input'>
            <input placeholder='아이디'></input>
            <input type='password' placeholder='비밀번호'></input>
            <input type='password' placeholder='비밀번호확인'></input>
            <input placeholder='이름'></input>
            <input maxLength={8} placeholder='생년월일 8자리'></input>
            {/* 성별 선택 */}
            <div className='gender_box'>
              <input id='male' type="radio" value='Male' name="gender" />
              <label for='male'>남자</label>
              <input id='female' type="radio" value='Female' name="gender" />
              <label for='female'>여자</label>
            </div>

          </div>
          <div className='membership_btn'>

            <Link to='/preference'><button>다음</button></Link>
            <Routes>
              <Route path='/preference' element={<Preference />}></Route>
            </Routes>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Membership