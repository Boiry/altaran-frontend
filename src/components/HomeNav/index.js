import React from 'react';

import './homeNav.scss';

const HomeNav = () => (
  <>
    <div className="home-nav-button home-nav-overview">Présentation</div>
    <div className="home-nav-button home-nav-empires">Empires</div>
    <div className="home-nav-button home-nav-story">Histoire</div>
    <div className="home-nav-button home-nav-discord">Discord</div>
    <div className="home-nav-button home-nav-forum">Forum</div>
    <div className="home-nav-button home-nav-wiki">Wiki</div>
    <div className="home-nav-button home-nav-media">Media</div>
  </>
);

export default HomeNav;
