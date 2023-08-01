import React, { useState } from 'react'
import Preference from './Preference'
import { Link, Routes, Route, useNavigate } from 'react-router-dom'

const Membership = () => {
  const nav = useNavigate();
  const [registerEmail, setRegisterEmail] = useState(""); // 이메일
  const [registerPassword, setRegisterPassword] = useState(""); // 비밀번호
  const [checkPassword, setCheckPassword] = useState(""); // 비밀번호 확인
  const [registerName, setRegisterName] = useState(""); // 이름
  const [registerBirth, setRegisterBirth] = useState(""); // 생년월일
  const [registerGender, setRegisterGender] = useState(""); // 성별
  const registerData = {registerEmail : registerEmail,
                        registerPassword : registerPassword,
                        registerName : registerName,
                        registerBirth : registerBirth,
                        registerGender : registerGender}

  console.log(registerData);

  // 다음 버튼 누를 시 작동하는 함수
  const next = ()=> {
    if(registerEmail === "" || registerPassword === "" || checkPassword === "" || registerName === "" || registerBirth === "" || registerGender === ""){
      alert('내용을 입력해 주세요!') // 빈칸있음
    }else if(registerPassword != checkPassword){
      alert('비밀번호가 일치하지 않습니다!') // 비밀번호와 확인이 일치하지않음
    }else if((registerEmail*0 == 0) || (registerName*0 == 0)){
      alert('아이디 또는 이름은 문자로 입력해주세요!') // 아이디, 이름을 숫자로 입력
    }else if(registerBirth*0 != 0){
      alert('생년월일은 숫자로 입력해주세요!') // 생년월일을 문자로 입력
    }else if(registerBirth.length < 8){
      alert('생년월일 8자리를 제대로 입력해주세요!') // 생년월일 8자리 이하로 입력
    }else{ // 설문조사페이지로이동, 유저 데이터 설문조사 컴포넌트로 전송
      nav('/preference', {state: registerData})
    }
  }

  return (
    <div className='membership_bg'>
      {/* 배경이 들어갈 자리 */}
      <div className='membership_bgvid'>
        <video className='membership_vid' autoPlay muted loop><source src='video/video2.mp4' /></video>
      </div>


      {/* <div className='membership_logo' > */}
      <img className='membership_img' src='img/TM.png'></img>
      {/* </div> */}

      <div className='membership_box'>
        <div>
          {/* 회원가입 정보 입력 */}
          <div className='membership_input'>

            {/* 아이디 비밀번호 변수에 저장 */}
            <input placeholder='아이디' onChange={(e) => {setRegisterEmail(e.target.value)}}></input> 
            <input type='password' placeholder='비밀번호' onChange={(e) => {setRegisterPassword(e.target.value)}}></input>
            <input type='password' placeholder='비밀번호확인' onChange={(e) => {setCheckPassword(e.target.value)}}></input>
            <input placeholder='이름' onChange={(e) => {setRegisterName(e.target.value)}}></input>
            <input maxLength={8} placeholder='생년월일 8자리' onChange={(e) => {setRegisterBirth(e.target.value)}}></input>

            {/* 성별 선택 */}
            <div className='gender_box'>
              <input id='male' type="radio" name="gender" value="Male" onChange={(e) => {setRegisterGender(e.target.value)}}/>
              <label for='male'>남자</label>
              <input id='female' type="radio" name="gender" value="Female" onChange={(e) => {setRegisterGender(e.target.value)}}/>
              <label for='female'>여자</label>
            </div>

          </div>
          <div className='membership_btn'>
            
            {/* 다음 버튼 클릭하여 데이터 전송 및 설문조사 페이지 이동 */}
            <button onClick={next}>다음</button>

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