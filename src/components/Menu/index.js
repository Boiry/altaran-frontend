import React from 'react';
import { setPage, getPage } from 'src/utils/router';

import './menu.scss';

const Menu = () => (
  <div className="menu">
    <button className="menu-button" onClick={() => console.log(getPage())}>TEST</button>
    <button className="menu-button" onClick={() => setPage('home-media')}>RETEST</button>

  </div>

);

export default Menu;
