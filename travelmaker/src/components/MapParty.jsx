import { React, useRef, useEffect, useState } from 'react'
import './css/Map.css'
import { Link, useNavigate } from 'react-router-dom';

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

  const mapList = [
    {first : '', title : '광역시 및 특별시', local : ['광주', '대구', '대전', '부산', '서울', '세종', '울산', '인천', '제주', '']},
    {first : '강원도', title : '강원도', local : ['강릉시', '속초시', '원주시', '춘천시', '동해시', '삼척시', '홍천군', '태백시', '평창군', '정선군']},
    {first : '경기도', title : '경기도', local : ['수원시', '성남시', '용인시', '부천시', '안산시', '화성시', '안양시', '파주시', '광명시', '고양시']},
    {first : '경남', title : '경상남도', local : ['김해시', '거제시', '남해군', '밀양시', '사천시', '양산시', '진주시', '창원시', '통영시', '하동군']},
    {first : '경북', title : '경상북도', local : ['경산시', '경주시', '구미시', '김천시', '문경시', '상주시', '안동시', '영주시', '영천시', '포항시']},
    {first : '전남', title : '전라남도', local : ['곡성군', '광양시', '나주시', '담양군', '목포시', '무안군', '보성군', '순천시', '여수시', '완도군']},
    {first : '전북', title : '전라북도', local : ['군산시', '김제시', '남원시', '무주군', '부안군', '순창군', '완주군', '익산시', '임실군', '전주시']},
    {first : '충남', title : '충청남도', local : ['천안시', '아산시', '논산시', '보령시', '공주시', '서산시', '태안군', '서천군', '금산군', '부여군']},
    {first : '충북', title : '충청북도', local : ['괴산군', '단양군', '보은군', '영동군', '옥천군', '음성군', '제천시', '증평군', '진천군', '청주시']}
    ]

  const [localName, setLocalName] = useState("") // 지역

  // 데이터 베이스에서 관광지 데이터 불러오기
  const getLocalData = async () => {
    sessionStorage.setItem('dateRan', 0)
    sessionStorage.setItem('startDate', '0000-00-00')
    sessionStorage.setItem('endDate', '0000-00-00')
    sessionStorage.setItem('localName', localName)
    nav('/partymember')
    closeMap();
  }

  return (
    <div className='map-container' ref={mapRef}>
      <button className='close-map-btn' onClick={closeMap}>X</button>
      <div className='map-box'>
        <div className='map-info-box'>
          <div className='map-search-area'>
            <div className='map-search-name'>{localName}</div>
            <button onClick={getLocalData}>선택</button>
          </div>
          {/* 창 크기 줄었을 때 안보임 */}
          <div className='map-palce-info-area'>
              {mapList.map((id) => {
                return (
                <div className='map-place-info-box'>
                  <div>{id.title}</div>
                  <div className='map-place'>
                    <Link><div className='map-place-name' onClick={() =>{setLocalName(id.first+id.local[0])}}>{id.local[0]}</div></Link>
                    <Link><div className='map-place-name' onClick={() =>{setLocalName(id.first+id.local[1])}}>{id.local[1]}</div></Link>
                    <Link><div className='map-place-name' onClick={() =>{setLocalName(id.first+id.local[2])}}>{id.local[2]}</div></Link>
                    <Link><div className='map-place-name' onClick={() =>{setLocalName(id.first+id.local[3])}}>{id.local[3]}</div></Link>
                    <Link><div className='map-place-name' onClick={() =>{setLocalName(id.first+id.local[4])}}>{id.local[4]}</div></Link>
                    <Link><div className='map-place-name' onClick={() =>{setLocalName(id.first+id.local[5])}}>{id.local[5]}</div></Link>
                    <Link><div className='map-place-name' onClick={() =>{setLocalName(id.first+id.local[6])}}>{id.local[6]}</div></Link>
                    <Link><div className='map-place-name' onClick={() =>{setLocalName(id.first+id.local[7])}}>{id.local[7]}</div></Link>
                    <Link><div className='map-place-name' onClick={() =>{setLocalName(id.first+id.local[8])}}>{id.local[8]}</div></Link>
                    <Link><div className='map-place-name' onClick={() =>{setLocalName(id.first+id.local[9])}}>{id.local[9]}</div></Link>
                  </div>
                </div>)
              })}
          </div>
        </div>
        <div className='map-form'>
          카카오지도
        </div>
      </div>
    </div>
  )
}

export default MapParty