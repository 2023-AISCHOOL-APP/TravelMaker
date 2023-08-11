import React, { useEffect, useState } from 'react';
import Login from './Login';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {createUserWithEmailAndPassword, signOut} from "firebase/auth";
import {auth} from "../firebase-config";
import { db } from '../firebase-config';
import { setDoc, doc } from 'firebase/firestore'
// import styled from 'styled-components';

const Preference = () => {
  const nav = useNavigate();
  const registerData = useLocation().state; // Membership에서 받아온 유저정보
  console.log(registerData);
  const [surveyIndex, setSurveyIndex] = useState(0); // 설문조사 인덱스 저장
  const [answers, setAnswers] = useState([]); // 사용자의 답변을 저장
  const [count, setCount] = useState(0);
  
  // 회원가입 정보 데이터베이스로 보내기
  const createUser = async ()=>{
    await setDoc(doc(db, "users", String(registerData.registerEmail)),
                                      {nickname : registerData.registerNickname,
                                       name: registerData.registerName,
                                       birth: registerData.registerBirth,
                                       email: registerData.registerEmail,
                                       password: registerData.registerPassword,
                                       gender: registerData.registerGender
                                      })
  }

  // 회원가입 정보 데이터베이스로 보내기
  const preData = async ()=>{
    await setDoc(doc(db, "preference", String(registerData.registerEmail)),
                    {preference: answers})
  }
  
  const surveys = [
    {
      question: '여행을 갈 때 여러 사람들과 함께 가는 게 좋을까?',
      options: ['여행은 같이할 사람이 많을 수 록 좋은 거 아니야?', 
      '나는 사람이 많으면 부담스럽더라'],
    },
    {
      question: '여행가서 보고싶은건 다 넣었는데...괜찮을까?',
      options: ['그런 식으로 다 넣으면 여행 가서 뭐 볼지 고민하느라 시간 낭비야!',
       '뭐 어때 계획을 세웠다는게 대단하지 자세한 건 여행 가서 생각하자~'],
    },
    {
      question: '여행은 사실 인생샷을 건지러 가는거 아니겠어?',
      options: ['여행 가서 사진을 안찍을 거면 왜가냐고! 인스타에 올려야지!', 
      '나는 사진찍는 시간이 아까워 추억은 눈으로 찍어서 가슴에 담는거야!'],
    },
    {
      question: '여행을 간다면 모든 컨텐츠를 다 즐기고 싶어?',
      options: ['당연하지! 관광지 구석구석 모든 걸 다 경험할 거야',
       '아니! 나는 계란도 노른자만 먹는다고! 핫플만 골라 가고 싶어'],
    },
    {
      question: '식당은 어디로 가는 게 좋을까...역시 유명한 맛집이 좋겠지?',
      options: ['여행의 꽃은 맛집이지! 맛집을 안 갈 거면 여행을 왜가?', 
      '밥은 뭘 먹든 상관없어 그리고 맛집에 가면 줄 서야 하잖아?'],
    },
    {
      question: '돈이 너무 많이 들 거 같은데 괜찮을까?',
      options: ['이럴 때 쓰는거지! 죽을 때 모아둔 돈 가지고 갈 거야? ', 
      '사실 난 다음 달 카드비도 밀렸어...디저트는 먹지말자...'],
    }
  ]; // 설문조사 질문과 답변

  const handleAnswer = (answer) => {
    setAnswers((prevAnswers) => [...prevAnswers, answer]); // 사용자의 답변을 저장
    setSurveyIndex((prevIndex) => prevIndex + 1); // 다음 설문지로 이동
    setCount((prevCount) => prevCount + 1); // 게이지 증가
  };

  const gaugeStyle = {
    width: `${(count / surveys.length) * 100}%`,
  };

  // 회원가입 완료 함수
  const signup = async ()=>{ 
    try{
      createUser(); // 유저정보 데이터베이스로 전송
      preData();
      const user = await createUserWithEmailAndPassword(
      auth,
      registerData.registerEmail,
      registerData.registerPassword
      );
      signOut(auth); // 회원가입시 자동으로 로그인되기 때문에 자동 로그아웃 시킴
      alert('Travel Mate에 합류해 주셔서 감사합니다!')
      nav('/login')
    }catch(error){
      alert('알수없는 오류입니다. 가입을 다시 진행해주세요..')
      nav('/membership')
    }
  }

  console.log(answers);
//   const Container = styled.div`
//     margin: 20px auto;
//     background-color: #eee;
//     width: 380px;
//     height: 15px;
//     display: flex;
//     align-items: center;
//     border-radius: 20px;
//   `;

//   const Progress = styled.div`
//     background-color: lightgreen;
//     width: ${() => (count / surveys.length) * 100 + '%'};
//     height: 100%;
//     transition: width 0.5s ease-out;
//     border-radius: 20px;
//   `;

//   //프로그레스 바에 원 달아서 프로그레스 바가 차오를 때 같이 차오름
//   const Dot = styled.div`
//   width: 25px;
//   height: 25px;
//   box-sizing: border-box;
//   border: 6px solid red;
//   border-radius: 35px;
//   background-color: yellow;
//   background-image : url("./img/air.png")
//   margin-left: -15px;
// `;



  return (
    <div className='preference_bg'>
      <div className='preference_bgvid'>
        <video className='preference_vid' autoPlay muted loop>
          <source src='video/video3.mp4' />
        </video>
      </div>

      <img className='preference_img' src='images/travel.png'/>

      <div className='preference_box'>
        {/* 게이지 바 */}
        {/* <Container>
          <Progress style={gaugeStyle} />
          <Dot />
        </Container> */}

        {/* 설문조사 인덱스가 설문조사 길이보다 작으면 실행 */}
        {surveyIndex < surveys.length ? (
          <>
            <p className='survey_question'>{surveys[surveyIndex].question}</p>
            {surveys[surveyIndex].options.map((option, index) => (
              <div key={index} className='preference_btnhov'>
                {/* 선택지 버튼을 클릭하면 handleAnswer가 실행 */}
                <button key={index} className='preference_btn a' onClick={() => handleAnswer(option)}>
                  {option}
                </button>
              </div>
            ))}
          </>
        ) : (
          <div align='center'>
            <h3>설문에 참여해주셔서 감사합니다!</h3>
            <h3>가입완료 버튼을 눌러주세요!</h3>
            {/* <p>답변 내용:</p>
            <ul>
              {answers.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul> */}
              <button className='preference_btn a' onClick={signup}>가입완료</button>
            <Routes>
              <Route path='/login' element={<Login />} />
            </Routes>
          </div>
        )}
        {/* <button id='back_btn'>뒤로가기</button> <button id='frt_btn'>앞으로</button> */}
      </div>
    </div>
  );
};

export default Preference;