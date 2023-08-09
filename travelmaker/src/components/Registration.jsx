import React, { useEffect, useRef, useState } from 'react'
import { db } from '../firebase-config';
import { getDoc, doc, collection, getDocs, setDoc } from 'firebase/firestore'


const Registration = () => {
  const dayNum = parseInt(sessionStorage.getItem('dateRan'))+1
  const startDate = sessionStorage.getItem('startDate')
  const endDate = sessionStorage.getItem('endDate')
  const localName = sessionStorage.getItem('localName')
  const userNick = sessionStorage.getItem('nick')
  console.log(dayNum, startDate, endDate, localName);

  // 데이터 베이스에서 캄방보드 데이터 불러오기
  const [userplanes, setUserPlanes] = useState([{}]);
  const getUser = async () => {
    for (let i = 1; i < dayNum + 1; i++) {
      const docRef = doc(db, "게시판", `Day${i}-${userNick}`);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUserPlanes([...userplanes, docSnap.data()]);
      } else {
        console.log("No such document!");
      }
    }
  };

  useEffect(()=>{
    getUser();
  },[])

  // textarea 자동으로 줄 늘어나게 하는 함수 (시작)
  const textarea = useRef();

  const handleResizeHeiht = () => {
    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
  };
  // textarea 자동으로 줄 늘어나게 하는 함수 (끝)
  return (
    <div className='registration-container'>
      {/* <div>
        <button className='registration-button b'>등록하기</button>
      </div> */}
      <div className='registration-box'>

        <div className='registration-input-box'>
          <h3>TravelMate 초대장</h3>
          <input maxLength={40} className='registration-title' placeholder='ex) TravelMaker가 즐거운 여행할 TravelMate를 모집합니다~'></input><br />
          <div>떠나는 지역 : {localName}</div>
          <div>
            <a>함께하는 친구들 : </a>
            <select className='registration-select'>
              <option value="A">1~3명</option>
              <option value="B">4~6명</option>
              <option value="AB">7~9명</option>
              <option value="O">10명 이상</option>
            </select>

          </div>

          <div>여행 기간 : {startDate} ~ {endDate} ({dayNum-1}박 {dayNum}일)</div>

          <textarea maxLength={800} rows="12" className='registration-detail' placeholder='ex)  ' onChange={handleResizeHeiht} ref={textarea}></textarea>
          {/* <input maxLength={800} rows={1} className='registration-detail' placeholder='ex)  ' onChange={handleResizeHeiht} ref={textarea}></input> */}

        </div>
        {/* <div>
          <button className='registration-button b'>등록하기</button>
        </div> */}
      </div>
      <div>
        <button className='registration-button b'>등록하기</button>
      </div>

    </div>
  )
}

export default Registration