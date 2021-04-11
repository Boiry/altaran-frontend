import React from 'react';
import { setPage, getPage } from 'src/utils/router';

import './menu.scss';

const Menu = () => (
  <>
    <div className="menu">
      <div className="menu-item" onClick={() => setPage('game-planets')}>Planètes</div>
      <div className="menu-item">Technologies</div>
      <div className="menu-item">Flotte en vol</div>
      <div className="menu-item">Espionnage</div>
      <div className="menu-item">Empire</div>
      <div className="menu-item">Communications</div>
      <div className="menu-item">Options</div>
    </div>
    <div className="menu-triangle"></div>
  </>
);

export default Menu;
