import React from 'react';
import PropTypes from 'prop-types';

import { setPage } from 'src/utils/router';

import './nav.scss';

const Nav = ({ handleLogout }) => {
  const handleClick = () => {
    handleLogout();
  };
  return (
    <div className="nav">
      <button className="nav-button" onClick={() => setPage('empire')}>Empire</button>
      <button className="nav-button" onClick={() => setPage('bases')}>Colonies</button>
      <button className="nav-button">Installations</button>
      <button className="nav-button" onClick={() => setPage('fleet')}>Flottes</button>
      <button className="nav-button">Espionnage</button>
      <button className="nav-button">Alliance</button>
      <button className="nav-button">Communications</button>
      <button className="nav-button" onClick={() => setPage('map')}>Cartographie</button>
      <button className="nav-button">Commerce</button>
      <button className="nav-button" onClick={() => setPage('administration')}>Administration</button>
      <button className="nav-button">Options</button>
      <button className="nav-button">Liens externes</button>
      <button className="nav-button">Boutique</button>
      <button className="nav-button" onClick={handleClick}>Déconnexion</button>
    </div>
  );
};

Nav.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default Nav;
