import React, { useEffect, useState } from 'react';

import { getPage, setPage } from 'src/utils/router';
import Connection from 'src/components/Connection';
import Presentation from 'src/components/Presentation';
import Media from 'src/components/Media';
import Community from 'src/components/Community';
import Loader from 'src/containers/Loader';
import { firstAnimation,
  secondAnimation,
  button1Animation,
  button2Animation,
  button3Animation,
  button4Animation,
  lastAnimation,
} from './animations.js';

import './home.scss';

import Lock1 from '../../assets/images/lock/lock1.svg';
import Lock2 from '../../assets/images/lock/lock2.svg';
import Lock3 from '../../assets/images/lock/lock3.svg';
import Lock4 from '../../assets/images/lock/lock4.svg';
import Lock5 from '../../assets/images/lock/lock5.svg';
import Lock6 from '../../assets/images/lock/lock6.svg';
import Lock7 from '../../assets/images/lock/lock7.svg';
import Lock8 from '../../assets/images/lock/lock8.svg';
import Lock9 from '../../assets/images/lock/lock9.svg';
import MenuLines from '../../assets/images/menu-lines.svg';
import Corner from '../../assets/images/corner.svg';
import Construction from 'src/assets/images/construction.svg';

const Home = ({ id }) => {
  useEffect(() => {
    if (window.localStorage.firstVisit === undefined) {
      firstAnimation();
    } else {
      secondAnimation();
    };
    window.localStorage.firstVisit = false;
    
  }, [Home]);
  
  const page = getPage();
  useEffect(() => {
    if (page === "login" || page === "register") {
      document.getElementsByClassName("article")[0].style.width = "40rem";
    } else {
      document.getElementsByClassName("article")[0].style.width = "80rem";
    };
  });

  // Launch the loader after a while
  const [rerender, setRerender] = useState(false);
  useEffect(() => {
    if (id) {
      lastAnimation();
      setTimeout(() => {
        setPage("loader");
        setRerender(true);
      }, 1200);
    }
  }, [id]);

  return (
    <>
      <>{page === "loader" && <Loader />}</>
      <nav className="navigation">
        <div className="lock">
          <img src={Lock1} className="lock1" />
          <img src={Lock2} className="lock2" />
          <img src={Lock3} className="lock3" />
          <img src={Lock4} className="lock4" />
          <img src={Lock5} className="lock5" />
          <img src={Lock6} className="lock6" />
          <img src={Lock7} className="lock7" />
          <img src={Lock8} className="lock8" />
          <img src={Lock9} className="lock9" />
        </div>
        <img src={MenuLines} className="menu-lines" />        
        <div className="button button1" onClick={() => { button1Animation(); setPage('login') }}>Connexion</div>
        <div className="button button2" onClick={() => { button2Animation(); setPage('presentation') }}>Présentation</div>
        <div className="button button3" onClick={() => { button3Animation(); setPage('media') }}>Media</div>
        <div className="button button4" onClick={() => { button4Animation(); setPage('community') }}>Communauté</div>
      </nav>

      <header className="header">
        <h1 className="title">PRALAND</h1>
        <div className="baseline">
          <img src={Corner} className="corner corner-top-left" />
          <img src={Corner} className="corner corner-top-right" />
          <img src={Corner} className="corner corner-bottom-left" />
          <img src={Corner} className="corner corner-bottom-right" />
          <h2 className="baseline-text">Le jeu qui tchue !<br />Parce qu'un jeu qui tchue c'est mieux qu'un jeu qui tchue pas, Praland c'est trop bien, jouez-y ou on vous pend haut et court.</h2>
        </div>
      </header>

      <div className="home-construction">
        <img src={Construction} className="home-construction-image" />
      </div>

      <article className="article">
        <img src={Corner} className="corner corner-top-left" />
        <img src={Corner} className="corner corner-top-right" />
        <img src={Corner} className="corner corner-bottom-left" />
        <img src={Corner} className="corner corner-bottom-right" />
        {page === "login" && <Connection />}
        {page === "register" && <Connection />}
        {page === "presentation" && <Presentation />}
        {page === "media" && <Media />}
        {page === "community" && <Community />}
      </article>
      <div className="page-opacity"></div>
    </>
  );
};

export default Home;
