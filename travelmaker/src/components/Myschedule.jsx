import React, { useEffect, useState } from 'react'


const Myschedule = () => {
  const selectMy = sessionStorage.getItem('select_my')
  const [myOrApp, setMyOrApp] = useState(true);

  useEffect(() => {
    if (selectMy != null) {
      sessionStorage.removeItem('select_my')
      setMyOrApp(true)
    } else {
      setMyOrApp(false)
    }
  }, [])

  const my = () => {
    setMyOrApp(true);
  }
  const app = () => {
    setMyOrApp(false);
  }

  console.log(myOrApp);
  return (
    <div className='my-schedule-container'>
      <div className='my-schedule-box'>
        <div className='my-schedule-menu'>
          <div className='my-schedule-select'>

            {/* <input id='my_t' type='radio'>
                <label for='my_t' className='my_text'>내가 작성한 글</label>
              </input>
              <input id ='my_s' type='radio'>
                <label for ='my_s' className='my_text'>신청한 사람 몰록</label>
              </input> */}
            <div className='my_box'>
              <input id='my_t' type="radio" name="my_sch" onClick={my} />
              <label className='my-sche-btn b' for='my_t' >내가 등록한 일정</label>
              <input id='my_s' type="radio" name="my_sch" onClick={app} />
              <label className='my-sche-btn b' for='my_s'>신청받은 목록</label>
            </div>

          </div>
        </div>

        {myOrApp ? <div className='my-schedule-form'>
          <div className='my-schedule-list'>
            <div className='plan-title'>일정 제목1</div>
            <div className='plan-author'>작성자1</div>
            <div className='plan-content'>내용1</div>
          </div>
          <div className='my-schedule-list'>
            <div className='plan-title'>일정 제목2</div>
            <div className='plan-author'>작성자2</div>
            <div className='plan-content'>내용2</div>
          </div>
        </div> :
          <div className='my-schedule-form'>
            <div className='my-schedule-list'>
              <div className='plan-title'>일정 제목1</div>
              <div className='apply-list'>신청한 사람</div>
              <div className='applicant'>정태녕</div>
              <div className='applicant'>김도운</div>
            </div>
            <div className='my-schedule-list'>
              <div className='plan-title'>일정 제목2</div>
              <div className='apply-list'>신청한 사람</div>
              <div className='applicant'>정태녕 🌡️ 35C</div>
              <div className='applicant'>김도운</div>
            </div>
          </div>}
      </div>
    </div>
  )
}

export default Myschedule