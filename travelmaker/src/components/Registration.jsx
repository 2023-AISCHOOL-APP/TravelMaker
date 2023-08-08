import React, { useRef } from 'react'

const Registration = () => {


  // textarea 자동으로 줄 늘어나게 하는 함수 (시작)
  const textarea = useRef();

  const handleResizeHeiht = () => {
    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
  };
  // textarea 자동으로 줄 늘어나게 하는 함수 (끝)
  return (
    <div className='registration-container'>
      {/* <div>
        <button className='registration-button b'>등록하기</button>
      </div> */}
      <div className='registration-box'>

        <div className='registration-input-box'>
          <h3>TravelMate 초대장</h3>
          <input maxLength={40} className='registration-title' placeholder='ex) TravelMaker가 즐거운 여행할 TravelMate를 모집합니다~'></input><br />
          <div>떠나는 지역 :</div>
          <div>
            <a>함께하는 친구들 : </a>
            <select className='registration-select'>
              <option value="A">1~3명</option>
              <option value="B">4~6명</option>
              <option value="AB">7~9명</option>
              <option value="O">10명 이상</option>
            </select>

          </div>

          <div>여행 기간 : </div>

          <textarea maxLength={800} rows="12" className='registration-detail' placeholder='ex)  ' onChange={handleResizeHeiht} ref={textarea}></textarea>
          {/* <input maxLength={800} rows={1} className='registration-detail' placeholder='ex)  ' onChange={handleResizeHeiht} ref={textarea}></input> */}

        </div>
        {/* <div>
          <button className='registration-button b'>등록하기</button>
        </div> */}
      </div>
      <div>
        <button className='registration-button b'>등록하기</button>
      </div>

    </div>
  )
}

export default Registration