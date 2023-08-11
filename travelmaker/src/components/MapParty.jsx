import { React, useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { BiXCircle, BiChevronRightSquare } from "react-icons/bi";
import OverlayContent from './OverlayContent';
import './css/Map.css'
import './css/Kakao.css'

import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase-config';
import { getDoc, doc, collection, getDocs, setDoc } from 'firebase/firestore'

const { kakao } = window;
const MapParty = ({ setMapOpen, id, title, content, writer }) => {
  const nav = useNavigate();


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
    const container = document.getElementById('map-p'); //지도를 담을 영역의 DOM 레퍼런스
    const options = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(mapxy[0], mapxy[1]), //지도의 중심좌표 : 서울시청으로 설정함
      level: 13 //지도의 레벨(확대, 축소 정도)
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
    var markerPosition = new kakao.maps.LatLng(mapxy[0], mapxy[1]);
    var marker = new kakao.maps.Marker({
      position: markerPosition,
      clickable: true
    });

    marker.setMap(map);
    // ----------- 마커 END ----------------

    // Overlay에 표시할 컨텐츠
    const overlayContent = document.createElement('div');
    const overlayComponent = <OverlayContent localData={localData} />;
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

  const mapList = [
    { first: '', title: '광역시 및 특별시', local: ['광주', '대구', '대전', '부산', '서울', '세종', '울산', '인천', '제주'] },
    { first: '강원도', title: '강원도', local: ['강릉시', '속초시', '원주시', '춘천시', '동해시', '홍천군', '태백시', '평창군', '정선군'] },
    { first: '경기도', title: '경기도', local: ['수원시', '성남시', '용인시', '부천시', '화성시', '안양시', '파주시', '광명시', '고양시'] },
    { first: '경남', title: '경상남도', local: ['김해시', '거제시', '남해군', '밀양시', '사천시', '진주시', '창원시', '통영시', '하동군'] },
    { first: '경북', title: '경상북도', local: ['경산시', '경주시', '구미시', '김천시', '문경시', '상주시', '안동시', '영주시', '포항시'] },
    { first: '전남', title: '전라남도', local: ['곡성군', '광양시', '나주시', '담양군', '목포시', '무안군', '보성군', '순천시', '여수시'] },
    { first: '전북', title: '전라북도', local: ['군산시', '김제시', '남원시', '무주군', '순창군', '완주군', '익산시', '임실군', '전주시'] },
    { first: '충남', title: '충청남도', local: ['천안시', '아산시', '논산시', '보령시', '공주시', '서산시', '태안군', '금산군', '부여군'] },
    { first: '충북', title: '충청북도', local: ['괴산군', '단양군', '보은군', '영동군', '옥천군', '음성군', '제천시', '진천군', '청주시'] }
  ]

  const [localName, setLocalName] = useState("전체") // 지역
  const [mapxy, setMapxy] = useState([37.7921, 128.89662])
  const [localData, setLocalData] = useState(['가회동성당', '서울특별시 종로구 북촌로 57', 'http://tong.visitkorea.or.kr/cms/resource/61/2780561_image2_1.png'])

  // 데이터 베이스에서 관광지 데이터 불러오기
  const getLocalData = async () => {
    if (localName === "전체") {
      sessionStorage.setItem('dateRan', 0)
      sessionStorage.setItem('startDate', '0000-00-00')
      sessionStorage.setItem('endDate', '0000-00-00')
      setMapxy([37.58208588, 126.9846617])
      setLocalData(['가회동성당', '서울특별시 종로구 북촌로 57', 'http://tong.visitkorea.or.kr/cms/resource/61/2780561_image2_1.png'])
      sessionStorage.setItem('localName', localName)
    } else {
      sessionStorage.setItem('dateRan', 0)
      sessionStorage.setItem('startDate', '0000-00-00')
      sessionStorage.setItem('endDate', '0000-00-00')
      const usersCollectionRef = collection(db, localName);
      const userSnap = await getDocs(usersCollectionRef);
      const data = userSnap.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setMapxy([data[0].mapy, data[0].mapx])
      setLocalData([data[0].title, data[0].addr1, data[0].image])
      sessionStorage.setItem('localName', localName)
    }
  }

  useEffect(() => {
    getLocalData();
  }, [localName])

  const sendLocalData = () => {
    closeMap();
    window.location.replace('/partymember')
  }

  return (
    <div className='map-p-container' ref={mapRef}>
      <BiXCircle className='close-map-btn' size='30' onClick={closeMap}>X</BiXCircle>
      <div className='map-box'>
        <div className='map-info-box'>
          <div className='map-select-area'>
            <div className="map-select-location">선택 지역</div>
            <div className='map-select-box'>
              <span className="map-place-text">{localName}</span>
            </div>
            <BiChevronRightSquare className='get-local-btn' size='30' onClick={sendLocalData}>선택</BiChevronRightSquare>
          </div>
          {/* 창 크기 줄었을 때 안보임 */}
          <div className='map-palce-select-area'>
            <button className="map-all-btn" onClick={() => { setLocalName("전체") }}>전체</button>
            {mapList.map((id) => {
              return (
                <div className='map-place-info-box'>
                  <div className='map-place-title'>{id.title}</div>
                  <div className='map-place'>
                    <Link><div className='map-place-name' onClick={() => { setLocalName(id.first + id.local[0]) }}>{id.local[0]}</div></Link>
                    <Link><div className='map-place-name' onClick={() => { setLocalName(id.first + id.local[1]) }}>{id.local[1]}</div></Link>
                    <Link><div className='map-place-name' onClick={() => { setLocalName(id.first + id.local[2]) }}>{id.local[2]}</div></Link>
                    <Link><div className='map-place-name' onClick={() => { setLocalName(id.first + id.local[3]) }}>{id.local[3]}</div></Link>
                    <Link><div className='map-place-name' onClick={() => { setLocalName(id.first + id.local[4]) }}>{id.local[4]}</div></Link>
                    <Link><div className='map-place-name' onClick={() => { setLocalName(id.first + id.local[5]) }}>{id.local[5]}</div></Link>
                    <Link><div className='map-place-name' onClick={() => { setLocalName(id.first + id.local[6]) }}>{id.local[6]}</div></Link>
                    <Link><div className='map-place-name' onClick={() => { setLocalName(id.first + id.local[7]) }}>{id.local[7]}</div></Link>
                    <Link><div className='map-place-name' onClick={() => { setLocalName(id.first + id.local[8]) }}>{id.local[8]}</div></Link>
                  </div>
                </div>)
            })}
          </div>
        </div>
        <div id='map-p'></div>
      </div>
    </div>
  )
}

export default MapParty