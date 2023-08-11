import React from 'react'

function PartyMemberList({schData}) {
    const selectedApp = Object.keys(schData).filter((key) => {
        return schData[key] === '신청완료';
      });
    console.log(selectedApp);
  return (
      <div>
          <div className='my-schedule-list'>
              <div className='detail-list-title'>{schData.title}</div>
              <div className='apply-list'>신청한 사람 ▼</div>
              <div className="apllicant-box">
                  {selectedApp.map((id) => {
                      return (<div className='applicant'>{id}</div>)
                  })}
              </div>
          </div>
      </div>
  )
}

export default PartyMemberList