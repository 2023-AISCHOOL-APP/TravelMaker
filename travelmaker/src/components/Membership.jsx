import React from 'react'
import Preference from './Preference'
import { Link, Routes, Route } from 'react-router-dom'

const Membership = () => {
  return (
    <div className='membership_bg'>
      <div className='membership_bgvid'>
        <video className='membership_vid' autoPlay muted loop><source src='video/video2.mp4' /></video>
      </div>


      {/* <div className='membership_logo' > */}
      <img className='membership_img' src='img/TM.png'></img>
      {/* </div> */}

      <div className='membership_box'>
        <div>
          <div className='membership_input'>
            <input placeholder='아이디'></input>
            <input type='password' placeholder='비밀번호'></input>
            <input type='password' placeholder='비밀번호확인'></input>
            <input placeholder='이름'></input>
            <input maxLength={8} placeholder='생년월일 8자리'></input>

            <div className='gender_box'>
              남<input className='gender' type="radio" name="gender" value="male" />
              여<input className='gender' type="radio" name="gender" value="female" />
            </div>

          </div>
          <div className='membership_btn'>
            
            <Link to='/preference'><button>다음</button></Link>
            <Routes>
              <Route path='/preference' element={<Preference/>}></Route>
            </Routes>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Membership