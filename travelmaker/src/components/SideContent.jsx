import React from 'react'
import { BiSolidUserCircle } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

const SideContent = ({userNickname, changeUserLogin}) => {
  const send = ()=>{
    {changeUserLogin(false)}
  }

  // 로그아웃 함수
  const logout = async () => {
    await signOut(auth);
    send();
    alert('로그아웃 되었습니다.')
    window.location.replace('/')
  }

  return (
    <div className='side-content-container'>
      <div className='side-id-box'>
        <BiSolidUserCircle className='logout-icon h-icon' size='40' color='black'></BiSolidUserCircle>
        <h2 className='side-id-text'>{userNickname}</h2>
        <Link onClick={logout}><p>로그아웃</p></Link>
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