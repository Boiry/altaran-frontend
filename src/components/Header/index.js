import React from 'react';

import HomeNav from 'src/components/HomeNav';
import { getPage, setPage } from 'src/utils/router';

import onoffIcon from 'src/assets/onoff_icon.png';
import './header.scss';

const Header = () => {
  let showConnectionIcon = true;
  const page = getPage();
  if (page!='login' && page!='register') {showConnectionIcon = true} else {showConnectionIcon = false};

  return (
    <div className="header-background">
      <div className="header-glow"></div>
      <div className="header-sliding-glow-left"></div>
      <div className="header-sliding-glow-right"></div>
      <div className="header-rectangle"></div>
      <div className="header-left-parallelogram"></div>
      <div className="header-right-parallelogram"></div>
      <div className="header-button-container"><HomeNav /></div>
      <div className="header-title">Praland</div>
      {showConnectionIcon && <img
        className="header-onoff-icon"
        src={onoffIcon}
        alt="on off icon"
        onClick={() => setPage('login')}
      />}
    </div>
  );
};

export default Header;
