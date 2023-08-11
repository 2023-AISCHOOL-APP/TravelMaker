import React, { useEffect, useRef, useState } from 'react'
import { db } from '../firebase-config';
import { getDoc, doc, collection, getDocs, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import Tag from './Tag'


const Registration = () => {
  const nav = useNavigate();
  const dayNum = parseInt(sessionStorage.getItem('dateRan')) + 1
  const startDate = sessionStorage.getItem('startDate')
  const endDate = sessionStorage.getItem('endDate')
  const localName = sessionStorage.getItem('localName')
  const userNick = sessionStorage.getItem('nick')
  // console.log(dayNum, startDate, endDate, localName);

  // 데이터 베이스에서 캄방보드 데이터 불러오기
  const [userPlanes, setUserPlanes] = useState([{ title: 'Day1', items: ['일정없음'] }]);
  const getUser = async () => {
    let Planes = [];
    for (let i = 1; i < dayNum + 1; i++) {
      const docRef = doc(db, "일별데이터", `Day${i}-${userNick}-${localName}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        Planes.push(docSnap.data());

      } else {
        console.log("No such document!");
      }
    }
    setUserPlanes(Planes);
  };

  useEffect(() => {
    getUser();
  }, [])
  console.log(userPlanes);
  // ---------------------------데이터 불러오기 끝

  // textarea 자동으로 줄 늘어나게 하는 함수 (시작)
  const textarea = useRef();

  const handleResizeHeiht = () => {
    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
  };
  // ---------------------------줄 늘어나게 하는 함수 (끝)

  // 폼안의 내용 저장하는 함수
  const [regiTitle, setRegiTitle] = useState("");
  const [regiDetail, setRegiDetail] = useState("");
  const [regiMembers, setRegiMembers] = useState("");
  const formData =
  {
    title: regiTitle,
    detail: regiDetail,
    members: regiMembers,
    userNick: userNick,
    localName: localName,
    startDate: startDate,
    endDate: endDate,
    dayRange: dayNum,
    state: '진행중'
  }

  useEffect(() => {
    console.log(regiDetail);
    console.log(regiTitle);
    console.log(regiMembers);
  }, [regiDetail])
  // -----------------------------폼안의 내용 저장하는 함수 끝

  // 폼안의 내용 데이터베이스로 보내기
  const sendFormData = async () => {
    await setDoc(doc(db, '게시판', `${userNick}-${localName}`),
      formData
    )
    alert("등록이 완료되었습니다~!")
    nav('/myschedule')
  }

  const handleClearForm = () => {
    setRegiTitle(""); // regi-title-in 초기화
    setRegiDetail(""); // registration-detail 초기화
    // 나머지 상태값 초기화도 필요한 경우에 추가
  };

  return (
    <div className='registration-container'>
      <div className='registration-box'>
        <div className='registration-input-box'>
          <span className='regi-box-title'>{userNick}님의 <br /> 여행을 소개해주세요!</span>
          <div className="regi-info-box">
            <div>지역 | {localName}</div>
            <div>여행 기간 | {startDate} ~ {endDate} ({dayNum - 1}박 {dayNum}일)</div>
            <div>
              <span>모집인원 | </span>
              <select className='regi-select' onChange={(e) => { setRegiMembers(e.target.value) }}>
                <option value="-">-</option>
                <option value="1명">1명</option>
                <option value="2명">2명</option>
                <option value="3명">3명</option>
                <option value="4명">4명</option>
                <option value="5명">5명</option>
                <option value="6명">6명</option>
                <option value="7명">7명</option>
                <option value="8명">8명</option>
                <option value="9명">9명</option>
                <option value="10명">10명</option>
              </select>
            </div>
          </div>
          <div className="cate-hashtag-box">
            <Tag />
          </div>
          <input
            maxLength={40}
            className='regi-title-in'
            placeholder='ex) 12월 4박 5일 서울여행할 동행 구해요~'
            value={regiTitle}
            onChange={(e) => { setRegiTitle(e.target.value) }}>
          </input>
          <textarea
            maxLength={800}
            rows="12"
            cols='12'
            className='registration-detail'
            value={regiDetail}
            placeholder='ex)&#13; &#13;1. 어떤 여행 스타일을 좋아하나요?&#13; &#13;2. 어떤 동행을 찾고 있나요?'
            ref={textarea}
            onChange={(e) => { setRegiDetail(e.target.value); handleResizeHeiht() }}>
          </textarea>
        </div>
        <div className='regi-btn-box'>
          <div className='regi-clear-button b' onClick={handleClearForm}>초기화</div>
          <div className='registration-button b' onClick={sendFormData}>등록하기</div>
        </div>
      </div>
      <div className='registration-plan-box'>
        {userPlanes.map((id) => {
          return (
            <div className='registration-plan'>
              <div className='regi-plan-title'>{id.title}</div>
              {id.items.map((pw, num) => {
                let backgroundColor = '';
                let borderColor = '';

                switch (num + 1) {
                  case 1:
                    backgroundColor = 'lightblue';
                    borderColor = 'lightblue';
                    break;
                  case 2:
                    backgroundColor = 'lightgreen';
                    borderColor = 'lightgreen';
                    break;
                  case 3:
                    backgroundColor = 'lightseagreen';
                    borderColor = 'lightseagreen';
                    break;
                  case 4:
                    backgroundColor = 'lightpink';
                    borderColor = 'lightpink';
                    break;
                  case 5:
                    backgroundColor = 'lightcoral';
                    borderColor = 'lightcoral';
                    break;
                  default:
                    backgroundColor = 'white';
                    borderColor = 'white';
                    break;
                }

                return (
                  <div className='regi-plan-list'>
                    <div className="regi-plan-list-num-box" style={{ backgroundColor: backgroundColor, borderColor: borderColor }}>
                      <div className='regi-plan-list-num'>{num+1}</div>
                    </div>
                    <div className='regi-plan-list-test'>{pw}</div>
                  </div>)
              })}
            </div>)
        })}
      </div>
    </div>
  )
}

export default Registration