import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Review from './Review';

const Application = () => {
  const [applyOrDone, setAppOrDone] = useState(true);
  const nav = useNavigate();

  const clickReview = () => {
    nav('/review')
  }

  const goToApply = () => {
    setAppOrDone(true)
  }

  const goToDone = () => {
    setAppOrDone(false)
  }

  // 리뷰 모달 띄우기
  const [reviewOpen, setReviewOpen] = useState(false); // 맵 모달창 노출 여부 state

  // 모달창 노출
  const showReview = () => {
    setReviewOpen(true);
  }
  // 리뷰 모달 끝

  return (
    <div className='app-container'>
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
              <label className='my-app-text-a b' for='my_t' onClick={goToApply}>내가 신청한 여행</label>
              <input id='my_s' type="radio" name="my_sch" />
              <label className='my-app-text-b b' for='my_s' onClick={goToDone}>다녀온 여행</label>
            </div>

          </div>
        </div>
        {applyOrDone ?
          <div className='my-schedule-form'>
            <Link to='/partydetail' className='detail-list-box'>
              <div className='detail-list'>
                <div className='detail-list-title'>태녕이와 함께하는 행복하고 즐거운 여행</div>
                <div className="de-li-info-box">
                  <div className='detail-list-author'>파티장 | 정태녕</div>
                  <div className='detail-list-location'>여행지역 | 광주</div>
                  <div className='detail-list-date-box'>
                    <div className="detail-list-date-text">여행기간 |</div>
                    <div className="detail-list-date">0000-00-00 ~ 0000-00-00</div>
                  </div>
                </div>
                <div className="detail-list-category">
                  {/* 최대 10개까지 */}
                  <div className='list-category-icon'>🚗차</div>
                  <div className='list-category-icon'>🚌버스</div>
                  <div className='list-category-icon'>👟뚜벅</div>
                  <div className='list-category-icon'>🏖️휴양</div>
                  <div className='list-category-icon'>🏃외부</div>
                  <div className='list-category-icon'>🏛️관광</div>
                  <div className='list-category-icon'>🚶‍♂️걷기</div>
                </div>
              </div>
            </Link>
          </div> :
          <div className='my-schedule-form'>
            {/* <Link to='/partydetail' className='my-sche-list-box'> */}
            <div className='my-sche-list'>
              <div className='detail-list-title'>제목</div>
              <div className="de-li-info-box">
                <div className='detail-list-author'>파티장 | 안녕</div>
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
              <button className='app-review' onClick={showReview}>리뷰쓰기</button>
              {reviewOpen && <Review setReviewOpen={setReviewOpen} />}
            </div>
            {/* </Link> */}
            {/* <Link to='/partydetail' className='my-sche-list-box'>
              <div className='my-sche-list'>
                <div className='detail-list-title'>제목</div>
                <div className="de-li-info-box">
                  <div className='detail-list-author'>파티장 | 김도운</div>
                  <div className='detail-list-date-box'>
                    <div className="detail-list-date-text">여행기간 |</div>
                    <div className="detail-list-date">0000-00-00 ~ 0000-00-00</div>
                  </div>
                </div>
                <div className="detail-list-category">
                  <div className='list-category-icon'>🚌버스</div>
                  <div className='list-category-icon'>👟뚜벅</div>
                  <div className='list-category-icon'>🏃외부</div>
                  <div className='list-category-icon'>🏛️관광</div>
                  <div className='list-category-icon'>🚶‍♂️걷기</div>
                  <div className='list-category-icon'>🚶‍♂️걷기</div>
                  <div className='list-category-icon'>🚶‍♂️걷기</div>
                  <div className='list-category-icon'>🚶‍♂️걷기</div>
                </div>
                <div className='my-sche-list-content'>
                  <div className='my-sche-list-content-text'>내용</div>
                </div>
              </div>
            </Link> */}
          </div>
        }
      </div>
    </div>
  )
}
export default Application