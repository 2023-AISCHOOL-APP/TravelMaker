import { React, useRef, useEffect } from 'react'
import { BiXCircle } from "react-icons/bi";

const Review = ({ setReviewOpen }) => {

  // 모달 끄기
  const closeReview = () => {
    setReviewOpen(false);
  };

  // 모달 외부 클릭 시 끄기
  const mapRef = useRef(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (mapRef.current && !mapRef.current.contains(event.target)) {
        setReviewOpen(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener('mousedown', handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener('mousedown', handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  });

  // text area 기능 적용 시작
  const textarea = useRef();

  const handleReviewHeiht = () => {
    textarea.current.style.height = 'auto';
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
  };
  // text area 기능 적용 끝

  return (
    <div className='review-container' ref={mapRef}>
      <BiXCircle className='review-container-exit' size='30' onClick={closeReview}>X</BiXCircle>
      <div className='review-title-box'>
        <div className='review-title'>Review</div>
      </div>
      <div className='review-contents'>
        <textarea className='review-contens-textarea' rows={1} onChange={handleReviewHeiht} ref={textarea} >
          
        </textarea>
      </div>
      <button className='review-btn b'>등록하기</button>
    </div>
  )
}

export default Review