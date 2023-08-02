import React from 'react'


const Myschedule = () => {
  return (
    <div className='my-schedule-container'>
      <nav className='my-nav-list'>
      </nav>

      <div className='my-schedule-box'>
        <div className='my-schedule-application'>
          <div className='my-schedule-select'>
            <div><button>내가 작성한 글</button></div>
            <div><button>신청한 사람 목록</button></div>
          </div>
        </div>

        <div className='my-schedule-form'>
          <div className='my-schedule-list'>
            <div>일정 제목</div>
            <div>작성자</div>
            <div>내용</div>
          </div>
          <div className='mt-schedule-list'></div>
          <div className='mt-schedule-list'></div>
          <div className='mt-schedule-list'></div>
          <div className='my-schedule-list'></div>
        </div>
      </div>
    </div>
  )
}

export default Myschedule