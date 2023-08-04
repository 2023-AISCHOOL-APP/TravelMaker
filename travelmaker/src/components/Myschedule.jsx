import React, { useEffect, useState } from 'react'


const Myschedule = () => {
  const selectMy = sessionStorage.getItem('select_my')
  const selectApp = sessionStorage.getItem('select_app')
  const [myOrApp, setMyOrApp] = useState(true);

  useEffect(()=>{
    if(selectMy != null){
      setMyOrApp(true)
    }else if(selectApp != null){
      setMyOrApp(false)
    }
  })

  const my = () => {
    setMyOrApp(true);
  }
  const app = () => {
    setMyOrApp(false);
  }

  console.log(myOrApp);
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
              <input id='my_t' type="radio" name="my_sch" onClick={my} />
              <label className='my_text b' for='my_t' >내가 작성한 글</label>
              <input id='my_s' type="radio" name="my_sch" onClick={app} />
              <label className='my_text b' for='my_s'>신청한 사람 목록</label>
            </div>

          </div>
        </div>

        {myOrApp ? <div className='my-schedule-form'>
          <div className='my-schedule-list'>
            <div>일정 제목1</div>
            <div>작성자1</div>
            <div>내용1</div>
          </div>
          <div className='my-schedule-list'>
            <div>일정 제목2</div>
            <div>작성자2</div>
            <div>내용2</div>
          </div>
        </div> :
          <div className='my-schedule-form'>
            <div className='my-schedule-list'>
            <div>일정 제목1</div>
            <div>신청자1</div>
            <div>내용1</div>
            </div>
            <div className='my-schedule-list'>
            <div>일정 제목2</div>
            <div>신청자2</div>
            <div>내용2</div>
            </div>
          </div>}
      </div>
    </div>
  )
}

export default Myschedule