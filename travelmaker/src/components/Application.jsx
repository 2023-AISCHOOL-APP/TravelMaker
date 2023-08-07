import React from 'react'

const Application = () => {
  return (
    <div className='app-container'>
      <nav className='app-nav-list'>
      </nav>

      <div className='app-box'>
        <div className='app-application'>
          <div className='app-schedule-select'>

            {/* <input id='my_t' type='radio'>
                    <label for='my_t' className='my_text'>내가 작성한 글</label>
                  </input>
                  <input id ='my_s' type='radio'>
                    <label for ='my_s' className='my_text'>신청한 사람 몰록</label>
                  </input> */}
            <div className='my_box'>
              <input id='my_t' type="radio" name="my_sch" />
              <label className='my-app-text b' for='my_t' >내가 신청한 여행</label>
              <input id='my_s' type="radio" name="my_sch" />
              <label className='my-app-text b' for='my_s'>신청 수락된 여행</label>
            </div>

          </div>
        </div>

        <div className='app-form'>
          <div className='app-list'>
            <div>일정 제목</div>
            <div>신청한 사람</div>
            <div>이름</div>
            <div>이름</div>
            <div>이름</div>
          </div>
          <div className='app-list'>
            <div>일정 제목</div>
            <div>신청한 사람</div>
            <div>이름</div>
            <div>이름</div>
            <div>이름</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Application