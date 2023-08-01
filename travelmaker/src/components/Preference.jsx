import React, { useState, useEffect } from 'react';
import Login from './Login';
import { Link, Routes, Route } from 'react-router-dom';
// import styled from 'styled-components';

const Preference = () => {
  const [surveyIndex, setSurveyIndex] = useState(0); // 설문조사 인덱스 저장
  const [answers, setAnswers] = useState([]); // 사용자의 답변을 저장
  const [count, setCount] = useState(0);
  const surveys = [
    {
      question: '첫 번째 질문: 정태녕을 좋아하나요?',
      options: ['예', '아니오'],
    },
    {
      question: '두 번째 질문: 왜 정태녕을 좋아하시나요?',
      options: ['똑똑해서', '멍청해서'],
    },
    {
      question: '세 번째 질문: 왜 정태녕을 좋아하시나요?',
      options: ['깜찍해서', '끔찍해서'],
    },
    {
      question: '네 번째 질문: 왜 정태녕을 좋아하시나요?',
      options: ['착해서', '나빠서'],
    },
    {
      question: '다섯 번째 질문: 왜 정태녕을 좋아하시나요?',
      options: ['하하', '호호'],
    },
  ]; // 설문조사 질문과 답변

  const handleAnswer = (answer) => {
    setAnswers((prevAnswers) => [...prevAnswers, answer]); // 사용자의 답변을 저장
    setSurveyIndex((prevIndex) => prevIndex + 1); // 다음 설문지로 이동
    setCount((prevCount) => prevCount + 1); // 게이지 증가
  };

  const gaugeStyle = {
    width: `${(count / surveys.length) * 100}%`,
  };

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

      <img className='preference_img' src='img/TM.png'></img>

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
                <button key={index} className='preference_btn' onClick={() => handleAnswer(option)}>
                  {option}
                </button>
              </div>
            ))}
          </>
        ) : (
          <div>
            <p>회원가입이 완료되었습니다. 감사합니다!</p>
            {/* <p>답변 내용:</p>
            <ul>
              {answers.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul> */}
            <Link to='/login'>
              <button className='preference_btn'>확인</button>
            </Link>
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