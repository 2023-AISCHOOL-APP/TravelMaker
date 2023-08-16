import { useState } from 'react';
import { React, useRef, useEffect } from 'react'
import { BiXCircle } from "react-icons/bi";
import { db } from '../firebase-config';
import { getDoc, doc, collection, getDocs, setDoc, updateDoc, deleteField } from 'firebase/firestore'

function Chat({setChatOpen, leaderNick, memberNick}) {

      // 모달 끄기
  const closeChat = () => {
    setChatOpen(false);
  };

  // 모달 외부 클릭 시 끄기
  const chatRef = useRef(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setChatOpen(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener('mousedown', handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener('mousedown', handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  });

    const [chats, setChats] = useState([])
    const [mymsg, setMyMsg] = useState([])
    const [rerender, setRerender]= useState("")
    useEffect(()=>{
      getMsg();
    },[])
  
    const [msgNum, setMsgNum] = useState(1)
    // 메세지 보내기
    const sendMsg = ()=>{
      setChats([...chats, {nickname : nick, contents : mymsg}])
      setBlank('')
    setMsgNum(msgNum+1)
    console.log(msgNum);
      sendMsgData();
    }
  
    // useEffect(()=>{
      
    // },[chats])
  
    // 매세지 데이터 가져오기

    const getMsg = async () => {
      let dataList = [];
      for (let i = 1; i < i+1; i++) {
        if(leaderNick != undefined){
            const docRef = doc(db, `${leaderNick}-${nick}`, `${i}`);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
              dataList.push(docSnap.data())
              setMsgNum(i)
              setMyMsg(docSnap.data().contents)
            } else {
              console.log("No such document!");
              if(dataList.length === 0){
                dataList = [{nickname : leaderNick, contents : '안녕하세요! 매너 채팅 부탁드립니다!'}]
                sendFirstMsg();
              }
              break;
            }
        }else{
            const docRef = doc(db, `${nick}-${memberNick}`, `${i}`);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
              dataList.push(docSnap.data())
              setMsgNum(i)
              setMyMsg(docSnap.data().contents)
            } else {
              console.log("No such document!");
              if(dataList.length === 0){
                dataList = [{nickname : leaderNick, contents : '안녕하세요! 매너 채팅 부탁드립니다!'}]
                sendFirstMsg();
              }
              break;
            }
        }
      }
      setChats(dataList);
    };
  
    const sendFirstMsg = async () => {
        if (leaderNick != undefined) {
            await setDoc(doc(db, `${leaderNick}-${nick}`, `1`),
                { nickname: leaderNick, contents: '안녕하세요! 매너 채팅 부탁드립니다!' })
        } else {
            await setDoc(doc(db, `${nick}-${memberNick}`, `${msgNum}`),
                { nickname: memberNick, contents: '안녕하세요! 매너 채팅 부탁드립니다!' })
        }
    }

    // 채팅 정보
    const nick = sessionStorage.getItem('nick')
    const sendMsgData = async () => {
        if (leaderNick != undefined) {
            await setDoc(doc(db, `${leaderNick}-${nick}`, `${msgNum+1}`),
                { nickname: nick, contents: mymsg })
        } else {
            await setDoc(doc(db, `${nick}-${memberNick}`, `${msgNum+1}`),
                { nickname: nick, contents: mymsg })
        }
        // window.location.reload();
    }
  
    // 엔터키 입력시 채팅 보내기 실행
    const [blank, setBlank] = useState()
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMsg();
        }
    }

    // 새로운 메시지가 추가될 때마다 스크롤을 맨 아래로 이동하는 함수
    const messageEndRef = useRef(null);
    useEffect(() => {
        messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }, [chats]);



      useEffect(() => {
        // 5초마다 getMsg 호출
        const interval = setInterval(getMsg, 5000);
    
        return () => {
          clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌 클리어
        };
      }, []);

  return (
    <div align='center'>
{/*  */}
      <div className='chat-container' ref={chatRef}>
      <BiXCircle className='chat-container-exit' size='30' onClick={closeChat}>X</BiXCircle>
      <div className='chat-title-box'>
        {leaderNick != undefined ?
        <div className='chat-title'>{leaderNick}님과의 채팅</div>
        :
        <div className='chat-title'>{memberNick}님과의 채팅</div>
        }
      </div>
      <div className='chat-contents'>
      {chats.map((id) => {
          return (
            <>
            {id.nickname != nick ? 
              <div align='left' className='chat-userBox'>
              <div className='chat-userNick'>{id.nickname}</div>
              <div className='chat-userContents'>{id.contents}</div>
              <br/>
            </div>
            :
            <div align='right' className='chat-myBox'>
            <div className='chat-myNick'>{id.nickname}</div>
            <div className='chat-myContents'>{id.contents}</div>
            <br/>
          </div>
            }
            </>
          )
        })}
        <div ref={messageEndRef}></div>
        </div>
      <div className='chat-send-box'>
      <input className="chat-input" type='text' value={blank} onChange={(e) => { setMyMsg(e.target.value); setBlank(e.target.value); }} onKeyDown={handleKeyDown}></input>
      <button className="chat-btn" onClick={sendMsg}>전송</button>
      </div>
    </div>
</div>
  )
}

export default Chat