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
import './components/css/Information.css';
import './components/css/Application.css';
import './components/css/PartyMember.css';
import './components/css/Map.css';
import './components/css/Registration.css';
import './components/css/PartyDetail.css'

// 컴포넌트 불러오기
import Header from './components/Header';
import Main from './components/Main'
import Select from './components/Select';
import ScheduleForm from './components/ScheduleForm'
import Login from './components/Login';
import Preference from './components/Preference';
import Membership from './components/Membership';
import Myschedule from './components/Myschedule';
import Information from './components/Information';
import Application from './components/Application';
import PartyMember from './components/PartyMember';
// import Map from './components/Map';
import LocalDetail from './components/LocalDetail';
import Registration from './components/Registration';
import PartyDetail from './components/PartyDetail';

import CsvUpload from './components/CsvUpload';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/localdetail' element={<LocalDetail/>}></Route>
        <Route path='/csvupload' element={<CsvUpload/>}></Route>
        <Route path='/' element={<Main/>}></Route>
        <Route path='/select' element={<Select />}></Route>
        <Route path='/scheduleform' element={<ScheduleForm />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/preference' element={<Preference />}></Route>
        <Route path='/membership' element={<Membership />}></Route>
        <Route path='/myschedule' element={<Myschedule />}></Route>
        <Route path='/information' element={<Information />}></Route>
        <Route path='/application' element={<Application />}></Route>
        <Route path='/partymember' element={<PartyMember />}></Route>
        <Route path='/registration' element={<Registration />}></Route>
        <Route path='/partydetail' element={<PartyDetail />}></Route>
        {/* <Route path='/map' element={<Map />}></Route> */}
        
      </Routes>
    </div>
  );
}

export default App;
