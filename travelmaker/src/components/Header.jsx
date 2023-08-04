import React, { useEffect, useState } from 'react'
import { BiUserCircle } from "react-icons/bi";
import { Link } from 'react-router-dom'

import Sidebar from './Sidebar';
import SideContent from './SideContent';

import './css/Sidebar.css'
import './css/SideContent.css'

const Header = () => {
  // 로그인한 유저 아이디
  const userID = sessionStorage.getItem('userId')

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
                  <img src='images/travel.png' height='50px'  />
                </Link>
              </a>
            </h1>
          </div>
        </div>
        <div className='icon-container'>
          {userID ?
            // 로그인 상태일때 노출되는 아이콘
              <Sidebar width={315}>
                <SideContent/>
              </Sidebar> :
            // 로그아웃 상태일때 노출되는 아이콘
            <Link to='/login'>
              <div className='loginbox'>
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