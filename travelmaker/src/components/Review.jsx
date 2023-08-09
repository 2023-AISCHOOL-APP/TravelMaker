import { React, useRef, useEffect } from 'react'

const Review = () => {


  const textarea = useRef();

  const handleReviewHeiht = () => {
    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
  };

  return (
    <div className='review-container' >
      <button className='review-container-exit b'>취소</button>
      <div className='review-title'>Review</div>
      <div className='review-contents'>
        <textarea className='review-contens-textarea' rows={1} onChange={handleReviewHeiht} ref={textarea} ></textarea>

      </div>
      <button className='review-btn b'>등록하기</button>

    </div>
  )
}

export default Review