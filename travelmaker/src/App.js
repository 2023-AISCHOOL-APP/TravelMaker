// css 불러오기
import './components/css/Header.css';
import './components/css/Main.css'
import './components/css/Select.css'

// 컴포넌트 불러오기
import Header from './components/Header';
import Main from './components/Main'
import Select from './components/Select';

import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header></Header>

      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/select' element={<Select />}></Route>
      </Routes>
    </div>
  );
}

export default App;
