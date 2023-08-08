import { React, useRef, useEffect, useState } from 'react'
import './css/LocalDetail.css'
import { Link, useNavigate, useLocation } from 'react-router-dom';

function LocalDetail({setDetailOpen, local}) {

  // 모달 끄기 
  const closeMap = () => {
    setDetailOpen(false);
  };

  // 모달 외부 클릭 시 끄기
  const mapRef = useRef(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (mapRef.current && !mapRef.current.contains(event.target)) {
        setDetailOpen(false);
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
    <div className='detail-container' ref={mapRef}>
      <button className='close-detail-btn' onClick={closeMap}>X</button>
      <div className='detail-form'>
          <p>장소명 : {local.title}</p>
          <img src={local.image} height='200px' />
          <p>주소 : {local.addr1}</p>
          <p>상세설명 : {local.overview}</p>
      </div>
    </div>
  )
}

export default LocalDetail