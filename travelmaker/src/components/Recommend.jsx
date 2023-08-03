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
            <label className='my_txt b' for='my_t' >전체보기</label>
            <input id='my_s' type="radio" name="my_sch" />
            <label className='my_txt b' for='my_s'>추천보기</label>
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