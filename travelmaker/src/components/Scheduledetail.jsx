import React from 'react'

const Scheduledetail = () => {
    return (
        <div className='detail-container'>
            <nav className='detail-nav-list'>
            </nav>

            <div className='detail-box'>
                <div className='detail-application'>
                    <div className='detail-select'>
                        <input id='my_t' type="radio" name="my_sch" />
                        <label className='my_text' for='my_t' >전체보기</label>
                        <input id='my_s' type="radio" name="my_sch" />
                        <label className='my_text' for='my_s'>추천</label>
                    </div>
                </div>

                <div className='detail-application'>
                    <div className='detail-select'>
                        <div className='detail-select-location'>지역 선택</div>
                        <div className='detail-select-day'><input type='date'></input></div>
                    </div>
                </div>

                <div className='detail-form'>
                    <div className='detail-list'>
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

export default Scheduledetail