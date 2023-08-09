import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


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
              <label className='my-sche-btn btn-b b' for='my_s'>신청자 목록</label>
            </div>

          </div>
        </div>
        {/* 클래스명에 detail 붙은 디자인은 PartyMember.css에 있음 */}
        {myOrApp ? <div className='my-schedule-form'>
          <Link to='/partydetail' className='my-sche-list-box'>
            <div className='my-sche-list'>
              <div className='detail-list-title'>제목</div>
              <div className="de-li-info-box">
                <div className='detail-list-author'>파티장 | 정태녕</div>
                <div className='detail-list-date-box'>
                  <div className="detail-list-date-text">여행기간 |</div>
                  <div className="detail-list-date">0000-00-00 ~ 0000-00-00</div>
                </div>
              </div>
              <div className="detail-list-category">
                <div className='list-category-icon'>🚗차</div>
                <div className='list-category-icon'>🚌버스</div>
                <div className='list-category-icon'>👟뚜벅</div>
                <div className='list-category-icon'>🏖️휴양</div>
                <div className='list-category-icon'>🏃외부</div>
                <div className='list-category-icon'>🏛️관광</div>
                <div className='list-category-icon'>🚶‍♂️걷기</div>
              </div>
              <div className='my-sche-list-content'>
                <div className='my-sche-list-content-text'>내용</div>
              </div>
            </div>
          </Link>
        </div> :
          <div className='my-schedule-form'>
            <div className='my-schedule-list'>
              <div className='detail-list-title'>제목</div>
              <div className='apply-list'>신청한 사람</div>
              <div className="apllicant-box">
                {/* 이름 15명 까지만 */}
                <div className='applicant'>김도운</div>
                <div className='applicant'>국지호</div>
                <div className='applicant'>임영찬</div>
                <div className='applicant'>이강휘</div>
                <div className='applicant'>김원영</div>
              </div>
            </div>
            <div className='my-schedule-list'>
              <div className='detail-list-title'>제목</div>
              <div className='apply-list'>신청한 사람</div>
              <div className="apllicant-box">
                <div className='applicant'>정태녕</div>
                <div className='applicant'>김도운</div>
              </div>
            </div>    
          </div>}
      </div>
    </div>
  )
}

export default Myschedule