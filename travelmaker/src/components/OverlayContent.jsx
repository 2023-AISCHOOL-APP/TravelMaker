import React from 'react'

const OverlayContent = ({ localData }) => {
  console.log(localData);
  return (
    <div className="ol-wrap">
      <div className="ol-info">
        <div className="ol-title">
          {localData[0]}
          <div className="ol-close" onclick="closeOverlay()" title="닫기"></div>
        </div>
        <div className="ol-body">
          <div className="ol-img">
            <img src={localData[2]} width="73" height="70" />
          </div>
          <div className="ol-desc">
            <div className='ol-content'>주소</div>
            <div className="ol-ellipsis">{localData[1]}</div>
            {/* <div className="ol-jibun ellipsis">(우) 04524 (지번) 태평로1가 31</div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OverlayContent