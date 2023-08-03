import React, {useEffect, useState} from 'react'
import { BiSolidUserCircle } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { db } from '../firebase-config';
import { getDoc, doc, collection, getDocs } from 'firebase/firestore'

const SideContent = () => {
  // 로그인한 유저 아이디
  const userID = sessionStorage.getItem('userId')

  // 데이터 베이스에서 유저 닉네임 데이터 불러오기
  const [userNickname, setUserNickname] = useState([]);
  const getUser = async () => {
    const docRef = doc(db, "users", String(userID));
    const docSnap = await getDoc(docRef);
    console.log(userID);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().nickname);
      setUserNickname(docSnap.data().nickname);
    } else {
      console.log("No such document!");
    }
  };
  

  // 데이터 베이스에서 특정 유저 설문조사 데이터 불러오기
  const [userPre, setUserPre] = useState([]);
  const getPre = async () => {
    const docRef = doc(db, "preference", String(userID));
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().preference);
      setUserPre(docSnap.data().preference);
    } else {
      console.log("No such document!");
    }
  };
  
  // 데이터 베이스에서 모든 유저 설문조사 데이터 불러오기
  const [usersPre, setUsersPre] = useState({})
  const getUsersPre = async () => {
    const usersCollectionRef = collection(db, 'preference');
    const userSnap = await getDocs(usersCollectionRef);
    const data = userSnap.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));
    setUsersPre(data);
  }

  // 특정 유저 설문 데이터와 모든 유저 설문 데이터 비교
  let dataNum = 0;
  let match = 0;
  let matchUsers = [];
  const matchPre = ()=>{
    for (let i = 0; i < usersPre.length; i++) {
      for (let j = 0; j < 6; j++) {
        dataNum = dataNum + 1;
        if (userPre[j] === usersPre[i].preference[j]) {
          console.log(`${i+1}번 데이터 ${j + 1}번 설문일치!`);
          match++;
        } else {
          console.log(`${i+1}번 데이터 ${j + 1}번 설문 불일치!`);
        }
        // console.log(dataNum);
        if(dataNum === 6){
          dataNum = 0;
          match = 0;
        }
        if(match === 4){
          console.log(`${usersPre[i].id} 유저와 일치합니다!`)
          matchUsers.push(usersPre[i].id)
        }
      }
    }
    console.log(matchUsers);
  }

  useEffect(()=>{
    getUser();
    getPre();
    getUsersPre();
  },[])

  useEffect(()=>{
      matchPre();
  },[usersPre])

  // 로그아웃 함수
  const logout = async () => {
    await signOut(auth);
    sessionStorage.removeItem('userId')
    alert('로그아웃 되었습니다.')
    window.location.replace('/')
  }

  return (
    <div className='side-content-container'>
      <div className='side-id-box'>
        <BiSolidUserCircle className='logout-icon s-icon' size='40' color='black'></BiSolidUserCircle>
        <h2 className='side-id-text'>{userNickname}</h2>
        <Link onClick={logout}><p className='b'>로그아웃</p></Link>
      </div>
      <div className='side-list-box'>
        <div className='side-leader-box'>
          <h3>파티장</h3>
          <Link to='/myschedule'>
            <li>내가 작성한 글</li>
          </Link>
          <Link to='/myschedule'>
            <li>신청한 사람</li>
          </Link>
        </div>
        <div className='side-crew-box'>
          <h3>파티원</h3>
          <li>신청목록</li>
        </div>
      </div>
    </div>
  )
}

export default SideContent