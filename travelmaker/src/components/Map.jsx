import { React, useRef, useEffect } from 'react'
import './css/Map.css'

const Map = ({ setMapOpen, id, title, content, writer }) => {

  // 모달 끄기 
  const closeMap = () => {
    setMapOpen(false);
  };

  // 모달 외부 클릭 시 끄기
  const mapRef = useRef(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (mapRef.current && !mapRef.current.contains(event.target)) {
        setMapOpen(false);
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
    <div className='map-container' ref={mapRef}>
      <button className='close-map-btn' onClick={closeMap}>X</button>
      <div className='map-box'>
        <div className='map-info-box'>
          <div className='map-search-area'>
            <input className='map-search-box' placeholder='검색어를 입력하세요.'></input>
          </div>
          {/* 창 크기 줄었을 때 안보임 */}
          <div className='map-palce-info-area'>
            <div className='map-place-info-box'>place1</div>
            <div className='map-place-info-box'>place2</div>
          </div>
        </div>
        <div className='map-form'>
          카카오지도
        </div>
      </div>
    </div>
  )
}

export default Map