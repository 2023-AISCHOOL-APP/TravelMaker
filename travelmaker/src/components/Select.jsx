import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../firebase-config';
import { getDoc, doc, collection, getDocs, setDoc } from 'firebase/firestore'

const Select = () => {
  const userID = sessionStorage.getItem('userId'); // 로그인한 유저 아이디
  
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
  const matchPre = () => {
    for (let i = 0; i < usersPre.length; i++) {
      for (let j = 0; j < 6; j++) {
        dataNum = dataNum + 1;
        if (userPre[j] === usersPre[i].preference[j]) {
          console.log(`${i + 1}번 데이터 ${j + 1}번 설문일치!`);
          match++;
        } else {
          console.log(`${i + 1}번 데이터 ${j + 1}번 설문 불일치!`);
        }
        if (dataNum === 6) {
          dataNum = 0;
          match = 0;
        }
        if (match === 4) {
          console.log(`${usersPre[i].id} 유저와 일치합니다!`)
          if (userID != usersPre[i].id) {
            matchUsers.push(usersPre[i].id)
          }
        }
      }
    }
  }

  // 데이터 베이스에서 특정 유저 닉네임 데이터 불러오기
  let num = 0;
  const getUsers = async () => {
    console.log(matchUsers);
    for (let i = 0; i < matchUsers.length; i++) {
      const docRef = doc(db, "users", String(matchUsers[i]));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data().nickname);
        sessionStorage.setItem(`matchUsers${num}`, docSnap.data().nickname)
        sessionStorage.setItem('matchNum', num+1)
        num++
      } else {
        console.log("No such document!");
      }
    }
  };

  useEffect(() => {
    getPre();
    getUsersPre();
  }, [])

  useEffect(() => {
    matchPre();
  }, [usersPre])

  useEffect(() => {
    getUsers();
  }, [matchUsers])

  return (
    <div className='select-container'>
      <div className='select-container-in-box'>
        <div className='reader-box'>
          <Link to='/scheduleform'>
            <a className='reader-btn click-b b'>파티장</a>
          </Link>
        </div>
        <div className='crew-box'>
          <Link to='/partymember'>
            <a className='crew-btn click-b b'>파티원</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Select