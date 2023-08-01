import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const Main = ({changeLogin, changeName}) => {
  const isLogin = useLocation().state;
  const send = ()=>{
    {changeLogin(isLogin)}
  }

  send();


  return (
    <div className='main-container'>
      <div className='main-contant-box'>
          {/* 창 크기 작을 때 보이는 버튼 */}
        <Link to='/select'>
          <a className='secret_btn b'>동행찾기</a>
        </Link>
        <div>
          <h1 className='main-title'>제목</h1>
        </div>
        <div>
          <p className='main-text'>내용내용내용내용내용내용내용내용</p>
        </div>
        {/* 창 크기 클 때 보이는 버튼 */}
        <Link to='/select'>
          <a className='main_btn b'>동행찾기</a>
        </Link>
      </div>
      <div className='main-img-box'>
        <img src='images/cars.png' className='main-img'></img>
      </div>
    </div>
  )
}

export default Main