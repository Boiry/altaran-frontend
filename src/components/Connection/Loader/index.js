import React, { useRef, useEffect } from 'react';

import './loader.scss';
import Waiting from 'src/assets/images/waiting.svg';

const Loader = () => {
  const wheelRef = useRef();
  const animation = () => {
    if (wheelRef.current) wheelRef.current.style.transform = "rotate(0deg)";
    setTimeout(() => {
      if (wheelRef.current) wheelRef.current.style.transform = "rotate(45deg)";
    }, 100);
    setTimeout(() => {
      if (wheelRef.current) wheelRef.current.style.transform = "rotate(90deg)";
    }, 200);
    setTimeout(() => {
      if (wheelRef.current) wheelRef.current.style.transform = "rotate(135deg)";
    }, 300);
    setTimeout(() => {
      if (wheelRef.current) wheelRef.current.style.transform = "rotate(180deg)";
    }, 400);
    setTimeout(() => {
      if (wheelRef.current) wheelRef.current.style.transform = "rotate(225deg)";
    }, 500);
    setTimeout(() => {
      if (wheelRef.current) wheelRef.current.style.transform = "rotate(270deg)";
    }, 600);
    setTimeout(() => {
      if (wheelRef.current) wheelRef.current.style.transform = "rotate(315deg)";
    }, 700);
  };

  useEffect(() => {
    let interval;
    if (wheelRef.current) {
      animation();
      interval = setInterval(animation, 800);
    }
    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <img src={Waiting} ref={wheelRef} className="connection-waiting-wheel" />
  );
};

export default Loader;
