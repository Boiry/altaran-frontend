import React from 'react';
import PropTypes from 'prop-types';

import HomeNav from 'src/containers/HomeNav';

import onoffIcon from 'src/assets/onoff_icon.png';
import './header.scss';

const Header = ({ page, goToPage }) => {
  let showConnectionIcon = true;
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
        onClick={() => goToPage('login')}
      />}
    </div>
  );
};

Header.propTypes = {
  page: PropTypes.string.isRequired,
  goToPage: PropTypes.func.isRequired,
};

export default Header;
