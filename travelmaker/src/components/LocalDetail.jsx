import React from 'react'
import { useLocation } from 'react-router-dom'

function LocalDetail() {
    const localData = useLocation().state;
    console.log(localData);
  return (
    <div>
        <br /><br /><br /><br />
        <p>장소명 : {localData.title}</p>
        <img src={localData.image} height='200px'/>
        <p>주소 : {localData.addr1}</p>
        <p>상세설명 : {localData.overview}</p>
    </div>
  )
}

export default LocalDetail