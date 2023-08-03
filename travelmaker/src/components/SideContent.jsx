import React, {useState} from 'react'
import { BiSolidUserCircle } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { db } from '../firebase-config';
import { getDoc, doc } from 'firebase/firestore'

const SideContent = () => {
  // 로그인한 유저 아이디
  const userID = sessionStorage.getItem('userId')

  // 데이터 베이스에서 데이터 불러오기
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

  getUser();

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
            <li className='b'>내가 작성한 글</li>
          </Link>
          <Link to='/myschedule'>
            <li className='b'>신청한 사람</li>
          </Link>
        </div>
        <div className='side-crew-box'>
          <h3>파티원</h3>
          <Link to='/application'>
            <li className='b'>신청목록</li>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SideContent