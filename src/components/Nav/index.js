import React from 'react';
import { getPage, setPage } from 'src/utils/router';

import './nav.scss';

const Nav = () => {
  const page = getPage();
  return (
    <div className="nav">
      <button className="nav-button" onClick={() => setPage('colonies')}>Colonies</button>
      <button className="nav-button">Empire</button>
      <button className="nav-button">Flottes</button>
      <button className="nav-button">Espionnage</button>
      <button className="nav-button">Alliance</button>
      <button className="nav-button">Communications</button>
      <button className="nav-button" onClick={() => setPage('map')}>Galaxie</button>
      <button className="nav-button">Commerce</button>
      <button className="nav-button">Politique</button>
      <button className="nav-button">Spécialisation</button>
      <button className="nav-button">Options</button>
      <button className="nav-button">Liens externes</button>
      <button className="nav-button">Boutique</button>
      <button className="nav-button">Déconnexion</button>
    </div>
  );
};

export default Nav;
