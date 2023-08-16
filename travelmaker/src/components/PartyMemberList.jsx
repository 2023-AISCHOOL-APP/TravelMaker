import React, { useEffect } from 'react'
import { useState } from 'react';
import { db } from '../firebase-config';
import { getDoc, doc, collection, getDocs, setDoc, updateDoc, deleteField } from 'firebase/firestore'
import Chat from './Chat';

function PartyMemberList({schData}) {
    // 채팅 모달 띄우기
    const [chatOpen, setChatOpen] = useState(false); // 맵 모달창 노출 여부 state

    // 모달창 노출
    const showChat = (id) => {
        setMemberNick(id);
        console.log(id);
        openChat();
    }

    const openChat = ()=>{
        if(memberNick != undefined){
            console.log(memberNick);
            setChatOpen(true);
        }else{
            openChat();
        }
        
    }
  // 채팅 모달 끝

    // 신청완료 및 매칭완료 유저
    const [selectedApp, setSelectedApp] = useState([])
    const [selectedMatched, setSelectedMatched] = useState([])
    useEffect(()=>{
        if(schData.applicantList != undefined){
            setSelectedApp(schData.applicantList);
        }else{
            setSelectedApp([]);
        }
        setSelectedMatched(schData.matchedList)
    },[])
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

    const [memberNick, setMemberNick] = useState("")

  return (
    <div>
      <div className='my-schedule-list'>
        <div className='apply-list-title'>{schData.title}</div>
        {schData.state === '매칭완료' || schData.state === '동행완료' || schData.state === '리뷰완료' ?
          <div className='apply-list'>매칭된 사람 ▼</div>
          :
          <div className='apply-list'>신청한 사람 ▼</div>
        }

        <div className="apllicant-box">
          {schData.state === '매칭완료' || schData.state === '동행완료' || schData.state === '리뷰완료' ?
            <>
              {selectedMatched.map((id) => {
                return (<div className='applicant-end' onClick={()=>{showChat(id);}}>{id}</div>)
              })}
                    {chatOpen && <Chat setChatOpen={setChatOpen} memberNick={memberNick}/>}
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
                    <div className='applicant-nic'>{id}</div></div>)
              })}
            </>
          }
        </div>
        {schData.state === '매칭완료' || schData.state === '동행완료' || schData.state === '리뷰완료' ?
          <button className='applicant-message'>매칭완료!&nbsp; 닉네임을 클릭해 채팅을 진행해보세요!</button>
          :
          <button className='applicant-btn b' onClick={matching}>신청수락</button>
        }

      </div>
    </div>
  )
}

export default PartyMemberList