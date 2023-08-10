import { React, useRef, useEffect } from 'react'

const Review = ({ setReviewOpen }) => {

  // 모달 끄기
  const closeReview = () => {
    setReviewOpen(false);
  };

  // text area 기능 적용 시작
  const textarea = useRef();

  const handleReviewHeiht = () => {
    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
  };
  // text area 기능 적용 끝

  return (
    <div className='review-container' >
      <button className='review-container-exit b' onClick={closeReview}>X</button>
      <div className='review-title-box'>
        <div className='review-title'>Review</div>
      </div>
      <div className='review-contents'>
        <textarea className='review-contens-textarea' rows={1} onChange={handleReviewHeiht} ref={textarea} ></textarea>

      </div>
      <button className='review-btn b'>등록하기</button>

    </div>
  )
}

export default Review