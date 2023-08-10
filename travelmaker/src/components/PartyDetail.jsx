import React from 'react'
import { useEffect, useState } from 'react';
import { useRef } from 'react';

const PartyDetail = ({schData, setDetailSchOpen}) => {

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

    return (
        <div className='partydetail-container' ref={detailSchRef}>
            <div>
            <button className='partydetail-close-btn' onClick={closeDetailSch}>x</button>
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
                        <div className="partydetail-text">여행기간 | {schData.startDate} ~ {schData.endDate} ({schData.dayRange}박 {schData.dayRange+1}일)</div>
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
        </div>
    )
}


export default PartyDetail