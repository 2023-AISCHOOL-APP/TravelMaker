import React, { useState } from 'react'
import { BiUserCircle } from "react-icons/bi";
import { Link } from 'react-router-dom'
import { db } from '../firebase-config';
import { getDoc, doc } from 'firebase/firestore'

import Sidebar from './Sidebar';
import SideContent from './SideContent';

import './css/Sidebar.css'
import './css/SideContent.css'

const Header = ({changeLogin, isLogin}) => {
  const [userLogin, setUserLogin] = useState("");
  const changeUserLogin = (boolean)=>{
    setUserLogin(boolean)
  }

// App.js에 로그인 값을 false로 바꿔 보내는 함수
const send = () => {
  { changeLogin(userLogin) }
}

if(userLogin===false){
  send();
}

  // 데이터 베이스에서 데이터 불러오기
  const [userNickname, setUserNickname] = useState([]);

  const getUser = async () => {
    const docRef = doc(db, "users", String(isLogin));
    const docSnap = await getDoc(docRef);
    console.log(isLogin);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().nickname);
      setUserNickname(docSnap.data().nickname);
    } else {
      console.log("No such document!");
    }
  };

  getUser();

  return (
    <div>
      <header className="App-header">
        <div className='header-container'>
          <div className='nav-container'>
            <h1 className='logo'>
              <a className='logo-text'>
                <Link to='/'>
                  {/* 로고 이미지 변경 */}
                  {/* <img src='images/logo99999.png' height='50px' width='150px' /> */}
                  <img src='images/Tlogo.png' height='50px'  />
                </Link>
              </a>
            </h1>
          </div>
        </div>
        <div className='icon-container'>
          {isLogin ?
            // 로그인 상태일때 노출되는 아이콘
              <Sidebar width={315}>
                <SideContent userNickname={userNickname} changeUserLogin={changeUserLogin}/>
              </Sidebar> :
            // 로그아웃 상태일때 노출되는 아이콘
            <Link to={'/login'}>
              <div className='loginbox'>
                {/* <span className='logintext'>로그인</span> */}
                {/* 로그인 아이콘 https://react-icons.github.io/react-icons */}
                <BiUserCircle className='login-icon h-icon' size='40' color='black'></BiUserCircle>
              </div>
            </Link>
          }
        </div>
      </header>
    </div>
  )
}

export default Header