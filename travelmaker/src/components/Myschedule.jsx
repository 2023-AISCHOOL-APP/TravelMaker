import React from 'react'


const Myschedule = () => {
  return (
    <div className='my-schedule-container'>
      <nav className='my-nav-list'>
      </nav>

      <div className='my-schedule-box'>
        <div className='my-schedule-application'>
          <div className='my-schedule-select'>

            {/* <input id='my_t' type='radio'>
                <label for='my_t' className='my_text'>내가 작성한 글</label>
              </input>
              <input id ='my_s' type='radio'>
                <label for ='my_s' className='my_text'>신청한 사람 몰록</label>
              </input> */}
            <div className='my_box'>
              <input id='my_t' type="radio" name="my_sch" />
              <label className='my_text b' for='my_t' >내가 작성한 글</label>
              <input id='my_s' type="radio" name="my_sch"  />
              <label className='my_text b' for='my_s'>신청한 사람 목록</label>
            </div>

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