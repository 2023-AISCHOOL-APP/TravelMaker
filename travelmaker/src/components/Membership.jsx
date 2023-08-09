import React, { useEffect, useState } from 'react'
import Preference from './Preference'
import { Link, Routes, Route, useNavigate, Form } from 'react-router-dom'

const Membership = () => {
  const nav = useNavigate();
  const [registerNickname, setRegisterNickname] = useState(""); // 닉네임
  const [registerEmail, setRegisterEmail] = useState(""); // 이메일
  const [registerPassword, setRegisterPassword] = useState(""); // 비밀번호
  const [checkPassword, setCheckPassword] = useState(""); // 비밀번호 확인
  const [registerName, setRegisterName] = useState(""); // 이름
  const [registerBirth, setRegisterBirth] = useState(""); // 생년월일
  const [registerGender, setRegisterGender] = useState(""); // 성별
  const registerData = {
    registerNickname: registerNickname,
    registerEmail: registerEmail,
    registerPassword: registerPassword,
    registerName: registerName,
    registerBirth: registerBirth,
    registerGender: registerGender
  }

  console.log(registerData);

  // 다음 버튼 누를 시 작동하는 함수
  const test = () => {
    // 닉네임 체크
    if (registerNickname === ""){
      setNick("")
      setCheckNick(false)
    }else if (registerNickname * 0 == 0){
      setNick("닉네임을 문자로 입력해주세요!")
      setCheckNick(false)
    } else if (registerNickname.length < 2) {
      setNick("닉네임을 2글자 이상 입력해주세요!")
      setCheckNick(false)
    } else{
      setNick("올바른 닉네임 입니다.")
      setCheckNick(true)
    }
    
    // 아이디 체크
    if(registerEmail === ""){
      setId("")
      setCheckId(false)
    } else if (registerEmail * 0 == 0){
      setId("아이디를 문자로 입력해주세요!")
      setCheckId(false)
    } else if (registerEmail.indexOf('@') === -1 || registerEmail.indexOf('.com') === -1){
      setId("아이디를 e-mail형식으로 입력해주세요!")
      setCheckId(false)
    } else {
      setId("올바른 아이디 입니다.")
      setCheckId(true)
    }

    // 비밀번호 체크
    if(registerPassword === ""){
      setPwd("")
      setCheckPwd(false)
    } else if(registerPassword.length < 8){
      setPwd("비밀번호를 8자리 이상으로 설정해주세요!")
      setCheckPwd(false)
    } else if(registerPassword != checkPassword){
      setPwd("비밀번호가 일치하지 않습니다!")
      setCheckPwd(false)
    } else {
      setPwd("올바른 비밀번호 입니다.")
      setCheckPwd(true)
    }

    // 이름 체크
    if (registerName === ""){
      setName("")
      setCheckName(false)
    } else if (registerName * 0 == 0){
      setName("이름을 문자로 입력해주세요!")
      setCheckName(false)
    } else {
      setName("올바른 이름입니다.")
      setCheckName(true)
    }

    // 생년월일 체크
    if (registerBirth === ""){
      setBirth("")
      setCheckBirth(false)
    } else if (registerBirth * 0 != 0) {
      setBirth("생년월일은 숫자로 입력해주세요!")
      setCheckBirth(false)
    } else if (registerBirth.length < 8){
      setBirth("생년월일 8자리를 제대로 입력해주세요!")
      setCheckBirth(false)
    } else{
      setBirth(" 올바른 생년월일입니다.")
      setCheckBirth(true)
    }

    // 성별 체크
    if (registerGender === ""){
      setGen("성별을 체크해주세요!")
      setCheckGen(false)
    } else {
      setGen("")
      setCheckGen(true)
    }

    // 빈칸 체크
    if (registerNickname === "" || registerEmail === "" || registerPassword === "" || checkPassword === "" || registerName === "" || registerBirth === "" || registerGender === ""){ 
      setCheck("빈칸없이 입력해주세요!")
      setNextBtn(true)
    } else if(checkNick && checkId && checkPwd && checkName && checkBirth && checkGen){
      setCheck("다음버튼을 눌러 설문조사를 진행해 주세요!")
      setNextBtn(false)
    } else {
      setCheck("올바른 내용을 입력해주세요!")
      setNextBtn(true)
    }
  }

  useEffect(()=>{
    test();
  },[registerData])

  // 설문조사페이지로이동, 유저 데이터 설문조사 컴포넌트로 전송
  const next = ()=>{
    nav('/preference', { state: registerData }) 
  }

  const toMain = () => {
    nav('/')
  }

  const [nick, setNick] = useState("")
  const [checkNick, setCheckNick] = useState(false)
  const [id, setId] = useState("")
  const [checkId, setCheckId] = useState(false)
  const [pwd, setPwd] = useState("")
  const [checkPwd, setCheckPwd] = useState(false)
  const [name, setName] = useState("")
  const [checkName, setCheckName] = useState(false)
  const [birth, setBirth] = useState("")
  const [checkBirth, setCheckBirth] = useState(false)
  const [gen, setGen] = useState("")
  const [checkGen, setCheckGen] = useState(false)
  const [check, setCheck] = useState("")
  const [nextBtn, setNextBtn] = useState(true)
  // const pwdHandle = (e)=>{
  //   test();
  // }
  return (
    <div className='membership_bg'>
      {/* 배경이 들어갈 자리 */}
      <div className='membership_bgvid'>
        <video className='membership_vid' autoPlay muted loop><source src='video/video2.mp4' /></video>
      </div>


      {/* <div className='membership_logo' > */}
      <img className='membership_img' src='images/logo99999.png' onClick={toMain} />
      {/* </div> */}

      <div className='membership_box'>
        <div>
          {/* 회원가입 정보 입력 */}
          <div className='membership_input'>

            {/* 아이디 비밀번호 변수에 저장 */}
            <input className='member-input' placeholder='닉네임(2글자 이상 입력)' onChange={(e) => { setRegisterNickname(e.target.value) }}></input>
            <div className='guideText'>{nick}</div>
            <input placeholder='아이디(ex : test@test.com)' onChange={(e) => { setRegisterEmail(e.target.value) }}></input>
            <div className='guideText'>{id}</div>
            <input type='password' placeholder='비밀번호(8자리 이상 입력)' onChange={(e) => { setRegisterPassword(e.target.value) }}></input>
            <input type='password' placeholder='비밀번호 확인' onChange={(e) => { setCheckPassword(e.target.value) }}></input>
            <div className='guideText'>{pwd}</div>
            <input placeholder='이름(ex : 홍길동)' onChange={(e) => { setRegisterName(e.target.value) }}></input>
            <div className='guideText'>{name}</div>
            <input maxLength={8} placeholder='생년월일 8자리(ex : 20221213)' onChange={(e) => { setRegisterBirth(e.target.value) }}></input>
            <div className='guideText'>{birth}</div>
            <br/>

            {/* 성별 선택 */}
            <div className='gender_box'>
              <input id='male' type="radio" name="gender" value="Male" onChange={(e) => { setRegisterGender(e.target.value) }}/>
              <label className='gender_select' for='male'>남자</label>
              <input id='female' type="radio" name="gender" value="Female" onChange={(e) => { setRegisterGender(e.target.value) }}/>
              <label className='gender_select' for='female'>여자</label>
            </div>
            <div className='guideText'>{gen}</div>
          </div>
          <div>

            {/* 다음 버튼 클릭하여 데이터 전송 및 설문조사 페이지 이동 */}
            <button className='membership_bt' onClick={next} disabled={nextBtn}>다음</button>
            <div className='guideText'>{check}</div>
            
            {/* 
            <button className='membership_bt' onClick={next}>다음</button>
            클래스 네임이 자꾸 사라짐 만약 버튼에 css적용이 안된다면 className 설정하세요
            */}

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