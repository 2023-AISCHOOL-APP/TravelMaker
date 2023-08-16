import React, { useEffect } from 'react'
import { useState } from 'react';
import { db } from '../firebase-config';
import { getDoc, doc, collection, getDocs, setDoc, updateDoc, deleteField } from 'firebase/firestore'

function PartyMemberList({ schData }) {
  // 신청완료 및 매칭완료 유저
  const [selectedApp, setSelectedApp] = useState([])
  const [selectedMatched, setSelectedMatched] = useState([])
  useEffect(() => {
    if (schData.applicantList != undefined) {
      setSelectedApp(schData.applicantList);
    } else {
      setSelectedApp([]);
    }
    setSelectedMatched(schData.matchedList)
  }, [])
  console.log(selectedApp);

  const [applicantList, setApplicantList] = useState([])
  console.log(applicantList);
  console.log(schData.members);

  // 매칭 완료 함수
  const matching = async () => {
    if (schData.members == applicantList.length) {
      await updateDoc(doc(db, '게시판', `${schData.userNick}-${schData.localName}`),
        {
          state: '매칭완료',
          matchedList: applicantList
        }
      )
      alert(`${schData.members}명의 신청수락이 완료되었습니다~`)
      window.location.replace('/myschedule')
    } else {
      alert(`${schData.members}명을 선택해 주세요!`)
    }
  }

  return (
    <div>
      <div className='my-schedule-list'>
        <div className='apply-list-title'>{schData.title}</div>
        {schData.state === '매칭완료' ?
          <div className='apply-list'>매칭된 사람 ▼</div>
          :
          <div className='apply-list'>신청한 사람 ▼</div>
        }

        <div className="apllicant-box">
          {schData.state === '매칭완료' ?
            <>
              {selectedMatched.map((id) => {
                return (<div className='applicant'>{id}</div>)
              })}
            </>
            :
            <>
              {selectedApp.map((id) => {
                return (
                  <div
                    className='applicant'
                    onChange={(e) => {
                      if (applicantList.indexOf(e.target.value) === -1) {
                        setApplicantList([...applicantList, e.target.value])
                      }
                      else {
                        setApplicantList(applicantList.filter(user => user != e.target.value))
                      }
                    }}>
                    <input type='checkbox' className='applicant-check' value={id}></input>
                    <div>{id}</div></div>)
              })}
            </>
          }
        </div>
        {schData.state === '매칭완료' ?
          <button className='applicant-btn'>매칭이 완료된 일정</button>
          :
          <button className='applicant-btn b' onClick={matching}>신청수락</button>
        }

      </div>
    </div>
  )
}

export default PartyMemberList