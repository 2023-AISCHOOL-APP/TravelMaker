import React from 'react'
import Login from './Login';
import { FaUserCircle } from "react-icons/fa";
import { Link, Routes, Route } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <header className="App-header">
        <div className='header-container'>
          <div className='nav-container'>
            <h1 className='logo'>
              <a className='logo-text'>
                <Link to='/'>
                  {/* 로고 이미지 변경 */}
                  <img src='images/logo99999.png' height='50px' width='150px' />
                </Link>
              </a>
            </h1>
          </div>
        </div>
        <div className='icon-container'>
          <div>
            <a>
              <Link to='/login'>
                {/* 로그인 아이콘 https://react-icons.github.io/react-icons */}
                <FaUserCircle className='user-icon' size='30'></FaUserCircle>
              </Link>
            </a>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header