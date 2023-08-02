import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase-config";

const Login = () => {

  const nav = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  // 로그인 변환 감시 함수
  useEffect(()=>{
    onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser);
    });  
  },[])
  

  // 로그인 함수
  const login = async ()=>{
    try{
      const users = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(users);
      alert('Travel Maker에 오신걸 환영합니다!')
      nav('/', {state: {login : true, user: loginEmail}}) // Main으로 이동 및 true(로그인상태) 값 전송
    }catch(error){
      alert('다시 시도해주세요!')
    }
  }

  // 엔터키 입력시 로그인 실행
  const handleKeyDown = (e)=>{
    if(e.key === 'Enter'){
      login();
    }
  };

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
        <input className='input' placeholder='아이디' onChange={(e) => {setLoginEmail(e.target.value)}}></input>
        <input type='password' className='input' placeholder='비밀번호' onChange={(e) => {setLoginPassword(e.target.value)}} onKeyDown={handleKeyDown}></input>

        {/* 버튼 클릭시 화면 이동 */}
        <hr />
        <button className='login_bt' onClick={login}>로그인</button>

        <Link to='/membership'><button className='login_bt'>회원가입</button></Link>
      </div>
    </div>
  )
}

export default Login