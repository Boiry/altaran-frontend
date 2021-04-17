import React from 'react';
import PropTypes from 'prop-types';

import Home from 'src/components/Home';
import Log from 'src/components/Log';
import Nav from 'src/containers/Nav';
import Colonies from 'src/components/Colonies';
import Map from 'src/components/Map';

const App = ({ page, isLogged }) => {
  if (window.sessionStorage.token) {
    isLogged = true;
  }
  return (
    <>
      {isLogged === false && <Home />}
      {isLogged === true && <Log />}
      {isLogged === true && <Nav />}
      {isLogged === true && page === "colonies" && <Colonies />}
      {isLogged === true && page === "map" && <Map />}
    </>
  );
};

App.propTypes = {
  page: PropTypes.string.isRequired,
  isLogged: PropTypes.bool.isRequired,
};

export default App;
