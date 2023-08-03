import React, { useEffect, useRef, useState } from "react";
import { BiMenu, BiArrowFromLeft } from "react-icons/bi";

const Sidebar = ({ width = 280, children }) => {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(-width);
  const side = useRef();

  // button 클릭 시 토글
  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(-width);
      setOpen(false);
    }
  };

  // 사이드바 외부 클릭시 닫히는 함수
  const handleClose = async (e) => {
    let sideArea = side.current;
    let sideCildren = side.current.contains(e.target);
    if (isOpen && (!sideArea || !sideCildren)) {
      await setX(-width);
      await setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  });

  return (
    <div className="side-container">
      <div
        ref={side}
        className="sidebar"
        style={{
          width: `${width}px`,
          height: "100%",
          transform: `translatex(${-xPosition}px)`
        }}
      > 
        {/* btnOn : true  / btnOff : false */}
        {isOpen ? 
        <BiMenu onClick={toggleMenu} className="side-button btnOn"/> :
        <BiMenu onClick={toggleMenu} className="side-button btnOff"/>}

        {/* 사이드바 내부값이 구현되는 위치 */}
        <div className="side-content">{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
