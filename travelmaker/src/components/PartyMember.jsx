import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MapParty from './MapParty';


function PartyMember() {
  const localName = sessionStorage.getItem('localName')
  const [mapOpen, setMapOpen] = useState(false); // 맵 모달창 노출 여부 state

  // 지역선택 모달창 노출
  const showMap = () => {
    setMapOpen(true);
  }

  const matchNum = sessionStorage.getItem('matchNum')
  let matchUsers = [];
  for (let i = 0; i < matchNum; i++) {
    matchUsers.push(sessionStorage.getItem(`matchUsers${i}`))
  }
  console.log(matchUsers);

  const [allOrRec, setAllOrRec] = useState(true); // 전체보기 혹은 추천보기
  const all = () => { setAllOrRec(true); } // 전체보기
  const rec = () => {
    setAllOrRec(false);
  } // 추천보기

  return (
    <div className='detail-container'>
      <div className='detail-box'>
        <div className='recommend-menu'>
          <div className='recommend-select'>
            <input id='my_t' type="radio" name="my_sch" onClick={all} />
            <label className='my_text b' for='my_t' >전체보기</label>
            <input id='my_s' type="radio" name="my_sch" onClick={rec} />
            <label className='my_text b' for='my_s'>추천보기</label>
          </div>
        </div>

        <div className='detail-application'>
          <div className='detail-select'>
            <div className="member-local-select b" onClick={showMap}>지역선택</div>
            {mapOpen && <MapParty setMapOpen={setMapOpen} />}
            <div className='date-container'>
              <div className="date-box">
                <p className="date-select">출발일</p>
                <input type='date'></input>
              </div>
              <div className="date-box">
                <p className="date-select">도착일</p>
                <input type='date'></input>
              </div>
            </div>
          </div>
        </div>
        <div className="pm-local-box">
          <div className='pm-local-select'>선택 지역 |</div>
          <div className="pm-local-name-box">
            <span className="pm-local-name">{localName}</span>
          </div>
        </div>
        <div className='detail-form'>
          {allOrRec ?
            <Link to='/partydetail' className='detail-list-box'>
              <div className='detail-list'>
                <div className='detail-list-title'>제목</div>
                <div className="de-li-info-box">
                  <div className='detail-list-author'>파티장 | 정태녕</div>
                  <div className='detail-list-date-box'>
                    <div className="detail-list-date-text">여행기간 |</div>
                    <div className="detail-list-date">0000-00-00 ~ 0000-00-00</div>
                  </div>
                </div>
                <div className="detail-list-category">
                  <div className='list-category-icon'>🚗차</div>
                  <div className='list-category-icon'>🚌버스</div>
                  <div className='list-category-icon'>👟뚜벅</div>
                  <div className='list-category-icon'>🏖️휴양</div>
                  <div className='list-category-icon'>🏃외부</div>
                  <div className='list-category-icon'>🏛️관광</div>
                  <div className='list-category-icon'>🚶‍♂️걷기</div>
                </div>
                <div className='detail-list-content'>
                  <div>내용</div>
                </div>
              </div>
            </Link>
            :
            <>

              {matchUsers.map((id) => {
                return (
                  <Link to='/partydetail'>
                    <div className='detail-list'>
                      <div>{id}</div>
                      <div>내용</div>
                      <div>내용</div>
                      <div>내용</div>
                    </div>
                  </Link>)
              })}

            </>
          }
        </div>
      </div>
    </div>
  )
}

export default PartyMember