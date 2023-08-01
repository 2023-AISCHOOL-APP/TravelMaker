import React, { useState, useEffect } from 'react'
import { Link, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Membership from './Membership';
import {onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
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
      nav('/', {state: true}) // Main으로 이동 및 true(로그인상태) 값 전송
    }catch(error){
      alert('다시 시도해주세요!')
    }
  }

  

  return (
    <div className='login_bg'>
      <div className='login_bgvid'>
        <video className='login_vid' autoPlay muted loop><source src='video/video1.mp4' /></video>
      </div>

      {/* <h1 className='title_name'>Travel Maker</h1> */}
      <img className='logo_img' src='img/TM.png' ></img>

      <div className='login_box'>

        <input className='input' placeholder='아이디' onChange={(e) => {setLoginEmail(e.target.value)}}></input>
        <input type='password' className='input' placeholder='비밀번호' onChange={(e) => {setLoginPassword(e.target.value)}}></input>

        <hr />
        <button className='login_bt' onClick={login}>로그인</button>
        <Link to='/membership'><button>회원가입</button></Link>
        <Routes>
          <Route path='/membership' element={<Membership/>}></Route>
        </Routes>

      </div>
    </div>
  )
}

export default Login