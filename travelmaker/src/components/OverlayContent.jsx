import React from 'react'

const OverlayContent = () => {
  return (
    <div className="ol-wrap">
      <div className="ol-info">
        <div className="ol-title">
          서울 시청
          <div className="ol-close" onclick="closeOverlay()" title="닫기"></div>
        </div>
        <div className="ol-body">
          <div className="ol-img">
            <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70" />
          </div>
          <div className="ol-desc">
            <div className="ol-ellipsis">서울특별시 중구 세종대로 110</div>
            <div className="ol-jibun ellipsis">(우) 04524 (지번) 태평로1가 31</div>
            <div className='ol-content'>내용</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OverlayContent