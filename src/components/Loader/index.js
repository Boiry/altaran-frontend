import React, { useEffect, useState, useRef } from 'react';

import { setPage } from 'src/utils/router';

import './loader.scss';

import Lock1 from 'src/assets/images/lock/lock1.svg';
import Lock2 from 'src/assets/images/lock/lock2.svg';
import Lock3 from 'src/assets/images/lock/lock3.svg';
import Lock4 from 'src/assets/images/lock/lock4.svg';
import Lock5 from 'src/assets/images/lock/lock5.svg';
import Lock6 from 'src/assets/images/lock/lock6.svg';
import Lock7 from 'src/assets/images/lock/lock7.svg';
import Lock8 from 'src/assets/images/lock/lock8.svg';
import Lock9 from 'src/assets/images/lock/lock9.svg';


const Loader = ({ webSocketConnect, webSocketConnected, fetchBases, id, setIsLogged }) => {
  const [elapsedTime, setElapsedTime] = useState('');
  useEffect(() => {
    fetchBases();
    webSocketConnect();
    const timeout = setTimeout(() => {
      setElapsedTime("tooLong");
    }, 10000);
    return () => {
      clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    if (webSocketConnected || elapsedTime) {
      lock2.current.style.animationPlayState = "paused";
      lock3.current.style.animationPlayState = "paused";
      lock4.current.style.animationPlayState = "paused";
      lock5.current.style.animationPlayState = "paused";
      lock6.current.style.animationPlayState = "paused";
      lock7.current.style.animationPlayState = "paused";
      lock8.current.style.animationPlayState = "paused";
      setTimeout(() => {
        lock1.current.style.animationPlayState = "paused";
      }, 50);
      setTimeout(() => {
        lock2.current.style.animationPlayState = "paused";
        lock1.current.style.display = "none";
      }, 100);
      setTimeout(() => {
        lock3.current.style.animationPlayState = "paused";
        lock2.current.style.display = "none";
      }, 150);
      setTimeout(() => {
        lock4.current.style.animationPlayState = "paused";
        lock3.current.style.display = "none";
      }, 200);
      setTimeout(() => {
        lock5.current.style.animationPlayState = "paused";
        lock4.current.style.display = "none";
      }, 250);
      setTimeout(() => {
        lock6.current.style.animationPlayState = "paused";
        lock5.current.style.display = "none";
      }, 300);
      setTimeout(() => {
        lock7.current.style.animationPlayState = "paused";
        lock6.current.style.display = "none";
      }, 350);
      setTimeout(() => {
        lock8.current.style.animationPlayState = "paused";
        lock7.current.style.display = "none";
      }, 400);
      setTimeout(() => {
        lock8.current.style.display = "none";
      }, 450);
      setTimeout(() => {
        lock9.current.style.display = "none";
      }, 500);
      setTimeout(() => {
        setPage("empire");
        setIsLogged(id, true);
      }, 550);
    }
  });

  // Animation
  const lock1 = useRef();
  const lock2 = useRef();
  const lock3 = useRef();
  const lock4 = useRef();
  const lock5 = useRef();
  const lock6 = useRef();
  const lock7 = useRef();
  const lock8 = useRef();
  const lock9 = useRef();
  useEffect(() => {
    for (let i=1; i<10; i++) {
      eval("lock"+i).current.style.visibility = "visible";
    };
    lock1.current.style.animation = "spin 4s linear infinite";
    lock2.current.style.animation = "counterspin 4s linear infinite";
    lock3.current.style.animation = "spin 8s linear infinite";
    lock4.current.style.animation = "spin 5s linear infinite";
    lock5.current.style.animation = "spin 5s linear infinite";
    lock6.current.style.animation = "spin 2s linear infinite";
    lock7.current.style.animation = "counterspin 5s linear infinite";
    lock8.current.style.animation = "counterspin 10s linear infinite";
  }, []);

  return (
    <div className="loader">
      <div className="lock">
        <img src={Lock1} ref={lock1} className="lock1" />
        <img src={Lock2} ref={lock2} className="lock2" />
        <img src={Lock3} ref={lock3} className="lock3" />
        <img src={Lock4} ref={lock4} className="lock4" />
        <img src={Lock5} ref={lock5} className="lock5" />
        <img src={Lock6} ref={lock6} className="lock6" />
        <img src={Lock7} ref={lock7} className="lock7" />
        <img src={Lock8} ref={lock8} className="lock8" />
        <img src={Lock9} ref={lock9} className="lock9" />
      </div>
    </div>
  )
}

export default Loader;
