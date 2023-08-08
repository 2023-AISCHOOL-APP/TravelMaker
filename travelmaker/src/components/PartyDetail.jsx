import React from 'react'

const PartyDetail = () => {
    return (
        <div className='partydetail-container'>
            <div className='partydetail-box'>
                <div>

                    {/* 타이틀 들어가는 칸 */}
                    <div className='partydetail-title'>
                        <div>안녕하세요 타이틀입니다.</div>
                    </div>

                    {/* 파티장 정보 들어갈 칸 */}
                    <div className='partydetail-leader'>
                        <div>안녕하세요 신청자 정보입니다.</div>
                    </div>

                    <div className='partydetail-short'>
                        <div>안녕하세요 간단 정보입니다.</div>
                    </div>

                    {/* 세부 내용 들어갈 칸 */}
                    <div className='partydetail-detail'>
                        <div>안녕하세요 내용입니다.</div>
                    </div>
                </div>
                
                {/* 일정 들어갈 칸 */}
                <div className='partydetail-schedule'>
                    <div>안녕하세요 일정표 입니다.</div>
                </div>

            </div>
        </div>
    )
}


export default PartyDetail