import React from 'react'
import { Link, useLocation} from 'react-router-dom';

const Main = ({changeLogin, start}) => {
  // Login.jsx 에서 받아온 로그인 값 true
  const isLogin = useLocation().state; 
  
  // App.js로 보내는 로그인 값 true
  const send = ()=>{
    {changeLogin(isLogin)}
  }

  // 로그인상태(로그인 값 = true)일때만 
  // App.js로 true 값을 보내도록 조건문 설정
  if(isLogin){
    send();
  }
  
  // 로그아웃 상태에서 동행찾기 누를시 노출되는 알람창
  const block = ()=>{
    alert('로그인 후 사용해주세요!')
  }


  return (
    <div className='main-container'>
      <div className='main-contant-box'>
        {/* 창 크기 작을 때 보이는 버튼 */}
        {/* {start ?
          <Link to='/select'>
            <a className='main_btn b'>동행찾기</a>
          </Link> :
          <Link to='/login' onClick={block}>
            <a className='main_btn b'>동행찾기</a>
          </Link>} */}
        <div>
          <h1 className='main-title'>제목</h1>
        </div>
        <div>
          <p className='main-text'>내용내용내용내용내용내용내용내용</p>
        </div>
        {/* 로그인 상태에 따라 동행찾기 접근 권한 설정 */}
        {start ?
        
          // 로그인 상태 : 동행찾기 접근 권한 부여
          <Link to='/select'>
            <a className='main_btn b'>동행찾기</a>
          </Link> :

          // 로그아웃 상태 : 동행찾기 접근 권한 없음 -> 로그인 화면으로 이동
          <Link to='/login' onClick={block}>
            <a className='main_btn b'>동행찾기</a>
          </Link>}

      </div>
      <div className='main-img-box'>
        <img src='images/cars.png' className='main-img'></img>
      </div>
    </div>
  )
}

export default Main