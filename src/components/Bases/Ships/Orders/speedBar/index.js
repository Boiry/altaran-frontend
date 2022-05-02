import React, { useEffect, useRef } from 'react';

import './speedBar.scss';

const SpeedBar = ({ setSelectedSpeed, selectedSpeed }) => {
  const speedBar = useRef();
  
  useEffect(() => {
    setBackground(selectedSpeed);
  }, [selectedSpeed]);

  const setSpeed = (e) => {
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    const speed = Math.round((100 / rect.width) * x);
    setSelectedSpeed(speed);
    setBackground(speed);
  }

  const setBackground = (speed) => {
    let gradient = 'linear-gradient(to right, rgb(0%, 0%, 100%), ';
    let n = 1;
    while (n <= speed) {
      gradient += `rgb(${n}%, 0%, ${100 - n}%) ${n}%, `;
      n++;
    }
    gradient += `transparent ${speed}%)`;
    speedBar.current.style.background = gradient;
  }

  return (
    <span ref={speedBar} className="ships-speed-bar" onClick={(e) => setSpeed(e)}></span>
  );
};

export default SpeedBar;
