import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { setPage } from 'src/utils/router';

import './nav.scss';

const Nav = ({ handleLogout }) => {
  let buttons;

  useEffect(() => {
    buttons = document.querySelectorAll(".nav-button");
    buttons[0].classList.add('nav-button-active');
  }, []);

  const handleClick = (e) => {
    buttons.forEach(button => button.classList.remove('nav-button-active'));
    e.target.classList.add('nav-button-active');
  };
  return (
    <div className="nav">
      <button className="nav-button" onClick={(e) => {handleClick(e); setPage('empire')}}>Empire</button>
      <button className="nav-button" onClick={(e) => {handleClick(e); setPage('bases')}}>Colonies</button>
      <button className="nav-button" onClick={(e) => {handleClick(e);}}>Installations</button>
      <button className="nav-button" onClick={(e) => {handleClick(e); setPage('fleet')}}>Flottes</button>
      <button className="nav-button" onClick={(e) => {handleClick(e);}}>Espionnage</button>
      <button className="nav-button" onClick={(e) => {handleClick(e);}}>Alliance</button>
      <button className="nav-button" onClick={(e) => {handleClick(e); setPage('communications')}}>Communications</button>
      <button className="nav-button" onClick={(e) => {handleClick(e); setPage('map')}}>Cartographie</button>
      <button className="nav-button" onClick={(e) => {handleClick(e);}}>Commerce</button>
      <button className="nav-button" onClick={(e) => {handleClick(e); setPage('administration')}}>Administration</button>
      <button className="nav-button" onClick={(e) => {handleClick(e);}}>Options</button>
      <button className="nav-button" onClick={(e) => {handleClick(e);}}>Liens externes</button>
      <button className="nav-button" onClick={(e) => {handleClick(e);}}>Boutique</button>
      <button className="nav-button" onClick={handleLogout}>Déconnexion</button>
    </div>
  );
};

Nav.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default Nav;
