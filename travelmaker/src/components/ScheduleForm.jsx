import React from 'react'

const ScheduleForm = () => {
  return (
    <div className='schedule-container'>
      <nav className='nav-list'>
        <ul className='nav-box'>
          <li><a className='local-select'>지역선택</a></li>
          <li><a className='date-select'>날짜지정</a></li>
        </ul>
      </nav>
      <div className='schedule-box'>
        <div className='info-box'>
          <div className='search-area'>
            <input className='search-box' placeholder='검색어를 입력하세요.'></input>
          </div>
          {/* 창 크기 줄었을 때 안보임 */}
          <div className='palce-info-area'> 
            <div className='place-info-box'>place1</div>
            <div className='place-info-box'>place2</div>
            <div className='place-info-box'>place3</div>
            <div className='place-info-box'>place4</div>
            <div className='place-info-box'>place5</div>
            <div className='place-info-box'>place6</div>
          </div>
        </div>
        <div className='schedule-form'>
          <div className='schedule-list'>day1</div>
          <div className='schedule-list'>+</div>
        </div>
      </div>
    </div>
  )
}

export default ScheduleForm