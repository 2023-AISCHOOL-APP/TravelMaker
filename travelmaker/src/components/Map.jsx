import React from 'react'

const Map = () => {
    return (
        <div className='map-container'>
            <div className='map-box'>
                <div className='map-info-box'>
                    <div className='map-search-area'>
                        <input className='map-search-box' placeholder='검색어를 입력하세요.'></input>
                    </div>
                    {/* 창 크기 줄었을 때 안보임 */}
                    <div className='map-palce-info-area'>
                        <div className='map-place-info-box'>place1</div>
                        <div className='map-place-info-box'>place2</div>
                        <div className='map-place-info-box'>place3</div>
                        <div className='map-place-info-box'>place4</div>
                        <div className='map-place-info-box'>place5</div>
                        <div className='map-place-info-box'>place6</div>
                    </div>
                </div>
                <div className='map-form'>
                    <div className='map-img-box'>
                        <img className='map-img' src='images/Map.png'></img>
                    </div>
                    <div className='map-btn'>
                        <button className='kg'>안녕하세요 경기 입니다</button>
                        <button className='kw'>안녕하세요 강원 입니다</button>
                        <button className='cn'>안녕하세요 충남 입니다</button>
                        <button className='cb'>안녕하세요 충북 입니다</button>
                        <button className='kb'>안녕하세요 경북 입니다</button>
                        <button className='kn'>안녕하세요 경남 입니다</button>
                        <button className='jb'>안녕하세요 전북 입니다</button>
                        <button className='jn'>안녕하세요 전남 입니다</button>
                        <button className='jj'>안녕하세요 제주 입니다</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Map