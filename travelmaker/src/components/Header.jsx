import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import {signOut} from "firebase/auth";
import {auth} from "../firebase-config";

const Header = ({changeLogin, isLogin}) => {
  const nav = useNavigate();

  // App.js에 로그인 값을 false로 바꿔 보내는 함수
  const send = ()=>{
    {changeLogin(false)}
  }

  // 로그아웃 함수
  const logout = async ()=>{
    await signOut(auth);
    send();
    alert('로그아웃 되었습니다.')
    nav('/')   
  }

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
          <a>
            {isLogin ?
              // 로그인 상태일때 노출되는 아이콘
              <Link>
                <div className='loginbox' onClick={logout}>
                  <span className='logintext'>로그아웃</span>
                  {/* 로그인 아이콘 https://react-icons.github.io/react-icons */}
                  <FaUserCircle className='user-icon' size='30'></FaUserCircle>
                </div>
              </Link> :
              // 로그아웃 상태일때 노출되는 아이콘
              <Link to={'/login'}>
                <div className='loginbox'>
                  <span className='logintext'>로그인</span>
                  {/* 로그인 아이콘 https://react-icons.github.io/react-icons */}
                  <FaUserCircle className='user-icon' size='30'></FaUserCircle>
                </div>
              </Link>
            }
          </a>
        </div>
      </header>
    </div>
  )
}

export default Header