import { React, useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { BiXCircle } from "react-icons/bi";
import OverlayContent from './OverlayContent';
import './css/Map.css'
import './css/Kakao.css'

const { kakao } = window;

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
  // ----------- 모달 END ----------------

  useEffect(() => {
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(37.5667, 126.9784), //지도의 중심좌표 : 서울시청으로 설정함
      level: 3 //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(container, options) //지도 생성

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 컨트롤 생성
    var mapTypeControl = new kakao.maps.MapTypeControl();

    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는 줌 컨트롤 생성
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 마커 표시
    var markerPosition = new kakao.maps.LatLng(37.5667, 126.9784);
    var marker = new kakao.maps.Marker({
      position: markerPosition,
      clickable: true
    });

    marker.setMap(map);
    // ----------- 마커 END ----------------

    // Overlay에 표시할 컨텐츠
    const overlayContent = document.createElement('div');
    const overlayComponent = <OverlayContent />;
    ReactDOM.render(overlayComponent, overlayContent);

    var iwRemoveable = true;
    var overlay = new kakao.maps.CustomOverlay({
      content: overlayContent,
      removable: iwRemoveable,
      position: marker.getPosition()
    });

    // 마커를 클릭했을 때 Overlay를 표시
    kakao.maps.event.addListener(marker, 'click', function () {
      overlay.setMap(map);
    });

    // Overlay를 닫기 위해 호출되는 함수 
    function closeOverlay() {
      overlay.setMap(null);
    }

    // 외부 클릭이 발생하면 Overlay 닫기
    const handleOutsideClick = () => {
      closeOverlay();
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
    // ------------ Overlay END ----------------
  })

  return (
    <div className='map-container' ref={mapRef}>
      <BiXCircle className='close-map-btn' size='30' onClick={closeMap}>X</BiXCircle>
      <div className='map-box'>
        <div className='map-info-box'>
          <div className='map-select-area'>
            <div className="map-select-location">선택한 지역</div>
            <div className='map-select-box'>전라남도</div>
          </div>
          {/* 창 크기 줄었을 때 안보임 */}
          <div className='map-place-info-area'>
            <div className='map-place-info-box'>
              <span className="map-place-text">place1</span>
            </div>
            <div className='map-place-info-box'>
              <span className="map-place-text">place2</span>
            </div>
          </div>
        </div>
        <div id='map'></div>
      </div>
    </div>
  )
}

export default Map