import React, { useEffect, useRef, useState } from 'react'
import { db } from '../firebase-config';
import { getDoc, doc, collection, getDocs, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';


const Registration = () => {
  const nav = useNavigate();
  const dayNum = parseInt(sessionStorage.getItem('dateRan'))+1
  const startDate = sessionStorage.getItem('startDate')
  const endDate = sessionStorage.getItem('endDate')
  const localName = sessionStorage.getItem('localName')
  const userNick = sessionStorage.getItem('nick')
  // console.log(dayNum, startDate, endDate, localName);

  // 데이터 베이스에서 캄방보드 데이터 불러오기
  const [userPlanes, setUserPlanes] = useState([{title:'Day1', items:['일정없음']}]);
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

  useEffect(()=>{
    getUser();
  },[])
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
    {title:regiTitle,
     detail:regiDetail,
     members:regiMembers,
     userNick:userNick,
     localName:localName,
     startDate:startDate,
     endDate:endDate,
     dayRange:dayNum}
  
  useEffect(()=>{
    console.log(regiDetail);
    console.log(regiTitle);
    console.log(regiMembers);
  },[regiDetail])
  // -----------------------------폼안의 내용 저장하는 함수 끝

  // 폼안의 내용 데이터베이스로 보내기
  const sendFormData =  async ()=>{
      await setDoc(doc(db, '게시판', `${userNick}-${localName}`),
      formData
        )
      alert("등록이 완료되었습니다~!")
      nav('/myschedule')
  }

  return (
    <div className='registration-container'>
      {/* <div>
        <button className='registration-button b'>등록하기</button>
      </div> */}
      <div className='registration-box'>

        <div className='registration-input-box'>
          <h3>TravelMate 초대장</h3>
          <input maxLength={40} className='registration-title' placeholder='ex) TravelMaker가 즐거운 여행할 TravelMate를 모집합니다~' onChange={(e) => { setRegiTitle(e.target.value) }}></input><br />
          <div>지역 | {localName}</div>
          <div>
            <a>모집인원 | </a>
            <select className='registration-select' onChange={(e) => { setRegiMembers(e.target.value) }}>
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

          <div>여행 기간 | {startDate} ~ {endDate} ({dayNum - 1}박 {dayNum}일)</div>
          <div className='registration-plan-box'>
            {userPlanes.map((id) => {
              return (
                <div className='registration-plan'>
                  <div>{id.title}</div>
                  {id.items.map((pw) => {
                    return (
                      <div className=''>
                        <div>{pw}</div>
                      </div>)
                  })}
                </div>)
            })}
          </div>

          <textarea maxLength={800} rows="12" className='registration-detail' placeholder='ex)  ' ref={textarea} onChange={(e) => { setRegiDetail(e.target.value); handleResizeHeiht() }}></textarea>
          {/* <input maxLength={800} rows={1} className='registration-detail' placeholder='ex)  ' onChange={handleResizeHeiht} ref={textarea}></input> */}

        </div>
        {/* <div>
          <button className='registration-button b'>등록하기</button>
        </div> */}
      </div>
      <div>
        <button className='registration-button b' onClick={sendFormData}>등록하기</button>
      </div>

    </div>
  )
}

export default Registration