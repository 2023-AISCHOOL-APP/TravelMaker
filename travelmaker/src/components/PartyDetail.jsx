import React from 'react'
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { db } from '../firebase-config';
import { getDoc, doc, collection, getDocs, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import { BiXCircle } from 'react-icons/bi';

const PartyDetail = ({schData, setDetailSchOpen}) => {
  const nick = sessionStorage.getItem('nick')
  const nav = useNavigate();

  const [finishBtn, setFinishBtn] = useState(true)

  const [appBtn, setAppBtn] = useState(true)
  const selected = Object.keys(schData).filter((key) => {
    return schData[key] === nick;
  });
  useEffect(()=>{
    if(schData.userNick === nick){
      setFinishBtn(false)
    }else{
      setFinishBtn(true)
    }
    if(selected.length != 0 && schData.userNick != nick){
      setAppBtn(false)
    }else{
      setAppBtn(true)
    }
  },[])
    // 모달 끄기 
  const closeDetailSch = () => {
    setDetailSchOpen(false);
  };

  // 모달 외부 클릭 시 끄기
  const detailSchRef = useRef(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (detailSchRef.current && !detailSchRef.current.contains(event.target)) {
        setDetailSchOpen(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener('mousedown', handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener('mousedown', handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  });

  // 신청자 닉네임 받아오기
  const [scheduleData, setScheduleData] = useState([{}])
  const getSchData = async () => {
    const docRef = doc(db, "게시판", `${schData.userNick}-${schData.localName}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setScheduleData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(()=>{
    getSchData()
  },[])

  // 신청자 닉네임 DB로 보내기
  const applicationMate = async () => {
    const dataLength = Object.keys(scheduleData).length; // 데이터 길이
    // 중복신청 판별 함수
    const selected = Object.keys(scheduleData).filter((key) => {
      return scheduleData[key] === nick;
    });
    if (selected.length === 0) {
      scheduleData[`신청자${dataLength - 7}`] = nick
      await setDoc(doc(db, '게시판', `${scheduleData.userNick}-${scheduleData.localName}`),
        scheduleData
      )
      alert("동행신청이 완료되었습니다~!")
      nav('/application')
    }else if(scheduleData.userNick === nick){
      alert("본인이 게시한 글에는 신청할 수 없습니다!")
    }else{
      alert("이미 신청한 일정입니다!")
    }
  }

  // 동행 완료 함수
  const finishedMate = ()=>{
    alert("동행이 완료되었습니다~  (알람만 뜨는 상태)")
  }
    return (
        
            <div className='partydetail-container' ref={detailSchRef}>
                <div>
                    <BiXCircle className='partydetail-close-btn' size='30' onClick={closeDetailSch}>X</BiXCircle>
                </div>
                <div className='partydetail-contents-box'>
                    {/* 타이틀 들어가는 칸 */}
                    <div className='partydetail-title'>
                        <div className="partydetail-text">{schData.title}</div>
                    </div>

          {/* 파티장 정보 들어갈 칸 */}
          <div className='partydetail-leader'>
            <div className="partydetail-text">파티장 | {schData.userNick}</div>
          </div>

          <div className='partydetail-short'>
            <div className="partydetail-text">지역명 | {schData.localName}</div>
            <div className="partydetail-text">여행기간 | {schData.startDate} ~ {schData.endDate} ({schData.dayRange}박 {schData.dayRange + 1}일)</div>
            <div className="partydetail-text">동행자 | {schData.members}</div>
          </div>

          {/* 세부 내용 들어갈 칸 */}
          <div className='partydetail-detail'>
            <div className="partydetail-text">{schData.detail}</div>
          </div>
        </div>

        {/* 일정 들어갈 칸 */}
        <div className='partydetail-schedule'>
          <div className="partydetail-text">안녕하세요 일정표 입니다.</div>
        </div>
        <div className='partydetail-appl-btn'>
          {finishBtn ?
            <>
              {appBtn ?
                <button className='partydetail-appl-btn b' onClick={applicationMate}>동행신청</button> :
                <div>
                  <div>신청이 완료된 동행입니다.</div>
                  <button className='partydetail-appl-btn b' onClick={finishedMate}>동행완료</button>
                </div>}
            </>
            : <div></div>}
                </div>
            </div>
    )
}


export default PartyDetail