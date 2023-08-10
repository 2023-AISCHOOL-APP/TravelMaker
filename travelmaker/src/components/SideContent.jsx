import React, { useEffect, useState } from 'react'
import { BiSolidUserCircle } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { reload, signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { db } from '../firebase-config';
import { getDoc, doc, collection, getDocs } from 'firebase/firestore'

const SideContent = () => {
  const nav = useNavigate();
  // 로그인한 유저 아이디
  const userID = sessionStorage.getItem('userId')
  const matchNum = sessionStorage.getItem('matchNum')

  // 데이터 베이스에서 유저 닉네임 데이터 불러오기
  const [userNickname, setUserNickname] = useState([]);
  const getUser = async () => {
    const docRef = doc(db, "users", String(userID));
    const docSnap = await getDoc(docRef);
    console.log(userID);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().nickname);
      setUserNickname(docSnap.data().nickname);
      sessionStorage.setItem('nick', docSnap.data().nickname)
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getUser();
  }, [])

  // 로그아웃 함수
  const logout = async () => {
    await signOut(auth);
    for (let i = 0; i < matchNum; i++) {
      sessionStorage.removeItem(`matchUsers${i}`)
    }
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('nick')
    alert('로그아웃 되었습니다.')
    window.location.replace('/')
  }

  // 데이터 베이스에서 관광지 데이터 불러오면서 스케줄작성으로 이동
  const localName = '강원도강릉시';
  const getLocalData = async () => {
    sessionStorage.setItem('dateRan', 0)
    sessionStorage.setItem('startDate', '0000-00-00')
    sessionStorage.setItem('endDate', '0000-00-00')
    const usersCollectionRef = collection(db, localName);
    const userSnap = await getDocs(usersCollectionRef);
    const data = userSnap.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    sessionStorage.setItem('localName', localName)
    nav('/scheduleform', { state: data })
  }
  //-------------------------------------------------------------

  // 게시판 정보 불러서 신청자 목록으로 이동
  const toApp = async () => {
    const usersCollectionRef = collection(db, '게시판');
    const userSnap = await getDocs(usersCollectionRef);
    const data = userSnap.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    sessionStorage.removeItem('select_my');
    window.location.replace('/myschedule')
    nav('/myschedule', { state: data })
  }

  // 게시판 정보 불러서 내가 등록한 일정으로 이동
  const toMy = async () => {
    const usersCollectionRef = collection(db, '게시판');
    const userSnap = await getDocs(usersCollectionRef);
    const data = userSnap.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    sessionStorage.setItem('select_my', 'my');
    window.location.replace('/myschedule')
    nav('/myschedule', { state: data })
  }

  return (
    <div className='side-content-container'>
      <div className='side-id-box'>
        <BiSolidUserCircle className='logout-icon s-icon' size='40' color='black'></BiSolidUserCircle>
        <h2 className='side-id-text'>{userNickname}</h2>
        <Link><p className='b' onClick={logout}>로그아웃</p></Link>
      </div>
      <div className='side-list-box'>
        <div className='side-leader-box'>
          <h3>파티장</h3>
          <Link to='/scheduleform'>
            <li className='b' onClick={getLocalData} >일정 작성</li>
          </Link>
          <Link>
            <li className='b' onClick={toMy}>내가 등록한 일정</li>
          </Link>
          <Link>
            <li className='b' onClick={toApp}>신청자 목록</li>
          </Link>
        </div>
        <div className='side-crew-box'>
          <h3>파티원</h3>
          <Link to='/partymember'>
            <li className='b'>일정 보기</li>
          </Link>
          <Link to='/application'>
            <li className='b'>신청 목록</li>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SideContent