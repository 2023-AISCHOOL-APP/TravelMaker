import React from 'react'

const Information = () => {
    return (
        <div className='information-container'>
        <nav className='information-nav-list'>
        </nav>
  
        <div className='information-box'>
          <div className='information-application'>
            <div className='information-select'>
              <div className='information-select-all'>전체보기</div>
              <div className='information-select-reco'>추천</div>
            </div>
          </div>

          <div className='information-application'>
            <div className='information-select'>
              <div className='information-select-title'>정태녕과 신나는 광주여행</div>
            </div>
          </div>

          <div className='information-application'>
            <div className='information-select'>
              <div className='information-select-writer'>정태녕</div>
            </div>
          </div>
          <div className='information-application'>
            <div className='information-select'>
              <div className='information-select-area'>광주</div>
              <div className='information-select-term'>여행 기간</div>
            </div>
          </div>
  
          <div className='information-form'>
            <div className='information-list'>
              <div>일정</div>
              <div>작성자</div>
              <div>내용</div>
              <div>내용</div>
              <div>내용</div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Information