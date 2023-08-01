import React from 'react'
import { Link } from 'react-router-dom'

const Select = () => {
  return (
    <div className='select-container'>
      <div className='select-container-in-box'>
        <div className='reader-box'>
          <Link to='/scheduleform'>
            <a className='reader-btn b'>파티장</a>
          </Link>
        </div>
        <div className='crew-box'>
          <Link to='/recommend'>
            <a className='crew-btn b'>파티원</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Select