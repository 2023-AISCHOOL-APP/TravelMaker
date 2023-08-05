import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LocalData = ({local}) => {
    const nav = useNavigate();
    const detail = ()=>{
        nav('/localdetail', {state: local})
    }
  return (
    <div className='place-info-box'>
        <p onClick={detail}>{local.title}</p>
        <img src={local.image} width='100%' onClick={detail}></img>
    </div>
  )
}

export default LocalData