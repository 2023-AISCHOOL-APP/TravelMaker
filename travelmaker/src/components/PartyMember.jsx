import React, { useState } from 'react'

function PartyMember() {
  const [allOrRec, setAllOrRec] = useState(true);
  const all = () => {
    setAllOrRec(true);
  }
  const rec = () => {
    setAllOrRec(false);
  }

  return (
    <div className='detail-container'>
      <nav className='detail-nav-list'>
      </nav>

      <div className='detail-box'>
        <div className='detail-application'>
          <div className='detail-select'>
            <input id='my_t' type="radio" name="my_sch" onClick={all} />
            <label className='my_text b' for='my_t' >전체보기</label>
            <input id='my_s' type="radio" name="my_sch" onClick={rec} />
            <label className='my_text b' for='my_s'>추천보기</label>
          </div>
        </div>

        <div className='detail-application'>
          <div className='detail-select'>
            <div className='detail-select-location'>지역 선택</div>
            <div className='detail-select-day'><input type='date'></input></div>
          </div>
        </div>
        <div className='detail-form'>
          {allOrRec ?

            <div className='detail-list'>
              <div>전체일정</div>
              <div>작성자</div>
              <div>내용</div>
              <div>내용</div>
              <div>내용</div>
            </div>
            :
            <div className='detail-list'>
              <div>추천일정</div>
              <div>작성자</div>
              <div>내용</div>
              <div>내용</div>
              <div>내용</div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default PartyMember