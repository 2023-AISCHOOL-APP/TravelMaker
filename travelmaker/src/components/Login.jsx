import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

const Login = () => {

  const nav = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  // 로그인 변환 감시 함수
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [])


  // 로그인 함수
  const login = async () => {
    try {
      const users = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(users);
      sessionStorage.setItem('userId', loginEmail)
      alert('Travel Maker에 오신걸 환영합니다!')
      window.location.replace('/') // Main으로 이동
    } catch (error) {
      alert('다시 시도해주세요!')
    }
  }

  // 엔터키 입력시 로그인 실행
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  // 메인 페이지로 이동
  const toMain = () => {
    nav('/')
  }

  // 회원가입 페이지로 이동
  const toMembership = ()=>{
    nav('/membership');
  }

  return (
    <div className='login_bg'>
        <div className='login-bg-box'></div>
      <img className='logo_img' src='images/travel.png' onClick={toMain} />

      <div className='login_box'>
        {/* 로그인 기본정보 입력 */}
        <input type='text' className='id-input' placeholder='아이디' onChange={(e) => { setLoginEmail(e.target.value) }} onKeyDown={handleKeyDown}></input>
        <input type='password' className='pw-input' placeholder='비밀번호' onChange={(e) => { setLoginPassword(e.target.value) }} onKeyDown={handleKeyDown}></input>

        {/* 버튼 클릭시 화면 이동 */}
        <hr />
        <button className='login_bt b' onClick={login}>로그인</button>

        <button className='login_bt b' onClick={toMembership}>회원가입</button>
      </div>
    </div>
  )
}

export default Login