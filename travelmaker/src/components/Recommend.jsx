import React from 'react'

const Recommend = () => {
  return (
    <div className='recommend-container'>
      <nav className='recommend-nav-list'>
      </nav>

      <div className='recommend-box'>
        <div className='recommend-application'>
          <div className='recommend-select'>
            <input id='my_t' type="radio" name="my_sch" />
            <label className='my_txt' for='my_t' >내가 작성한 글</label>
            <input id='my_s' type="radio" name="my_sch" />
            <label className='my_txt' for='my_s'>신청한 사람 목록</label>
          </div>
        </div>

        <div className='recommend-application'>
          <div className='recommend-select'>
            <div className='reommend-select-location'>지역 선택</div>
            <div className='recommend-select-day'><input type='date'></input></div>
          </div>
        </div>

        <div className='recommend-form'>
          <div className='recommend-list'>
            <div>일정</div>
            <div>작성자</div>
            <div>내용</div>
            <div>내용</div>
            <div>내용</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recommend