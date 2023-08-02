// css 불러오기
import './components/css/Header.css';
import './components/css/Main.css';
import './components/css/Select.css';
import './components/css/Common.css';
import './components/css/Schedule.css';
import './components/css/Login.css';
import './components/css/Preference.css';
import './components/css/Membership.css';
import './components/css/Myschedule.css';
import './components/css/Recommend.css';
import './components/css/Information.css';

// 컴포넌트 불러오기
import Header from './components/Header';
import Main from './components/Main'
import Select from './components/Select';
import ScheduleForm from './components/ScheduleForm'
import Recommend from './components/Recommend';
import Login from './components/Login';
import Preference from './components/Preference';
import Membership from './components/Membership';
import Myschedule from './components/Myschedule';
import Information from './components/Information';

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const changeLogin = (boolean)=>{
    setIsLogin(boolean)
  }

  return (
    <div className="App">
      <Header changeLogin={changeLogin} isLogin={isLogin} />
      <Routes>
        <Route path='/' element={isLogin ? <Main changeLogin={changeLogin} start={true} /> : <Main changeLogin={changeLogin} start={false} />}></Route>
        <Route path='/select' element={<Select />}></Route>
        <Route path='/scheduleform' element={<ScheduleForm />}></Route>
        <Route path='/recommend' element={<Recommend />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/preference' element={<Preference />}></Route>
        <Route path='/membership' element={<Membership />}></Route>
        <Route path='/myschedule' element={<Myschedule />}></Route>
        <Route path='/information' element={<Information />}></Route>
      </Routes>
    </div>
  );
}

export default App;
