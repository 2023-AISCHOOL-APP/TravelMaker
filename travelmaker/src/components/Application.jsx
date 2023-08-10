import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { db } from '../firebase-config';
import { getDoc, doc, collection, getDocs, setDoc } from 'firebase/firestore'
import Review from './Review';
import MyscheduleForm from './MyscheduleForm'
import { useEffect } from 'react';

const Application = () => {
  const nick = sessionStorage.getItem('nick')
  const [applyOrDone, setAppOrDone] = useState(true);

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

  // 게시판 정보 받아오기
  
  const [scheduleData, setScheduleData] = useState([{}])
  const getSchData = async (e) => {
    const usersCollectionRef = collection(db, '게시판');
    const userSnap = await getDocs(usersCollectionRef);
    const data = userSnap.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    let dataList = [];
    for (let i = 0; i < data.length; i++) {
      const selected = Object.keys(data[i]).filter((key) => {
        return data[i][key] === nick;
      });
      if (selected.length != 0 && data[i].userNick != nick) {
        dataList.push(data[i])
      }
    }
    console.log(dataList);
    setScheduleData(dataList)
  }

  useEffect(()=>{
    getSchData();
  },[])

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
            {scheduleData.map(item => <MyscheduleForm schData={item} key={item.title} />)}
          </div> :
          <div className='my-schedule-form'>
            <div className='done-trip-list'>
              <div className='detail-list-title'>제목</div>
              <div className="de-li-info-box">
                <div className='detail-list-author'>파티장 | 안녕</div>
                <div className='detail-list-location'>여행지역 | 광주</div>
                <div className='detail-list-date-box'>
                  <div className="detail-list-date-text">여행기간 |</div>
                  <div className="detail-list-date">0000-00-00 ~ 0000-00-00</div>
                </div>
              </div>
              <div className='write-review-btn b' onClick={showReview}>리뷰쓰기</div>
              {reviewOpen && <Review setReviewOpen={setReviewOpen} />}
            </div>
          </div>
        }
      </div>
    </div>
  )
}
export default Application