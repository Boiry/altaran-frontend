import React from 'react';

import HomeNav from 'src/components/HomeNav';

import onoffIcon from 'src/assets/onoff_icon.png';
import './header.scss';

const Header = () => (
  <div className="header-background">
    <div className="header-glow"></div>
    <div className="header-sliding-glow-left"></div>
    <div className="header-sliding-glow-right"></div>
    <div className="header-rectangle"></div>
    <div className="header-left-parallelogram"></div>
    <div className="header-right-parallelogram"></div>
    <div className="header-button-container"><HomeNav /></div>
    <div className="header-title">Praland</div>
    <img className="header-onoff-icon" src={onoffIcon} alt="on off icon" />
  </div>
);

export default Header;
