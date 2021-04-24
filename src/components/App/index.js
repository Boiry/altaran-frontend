import React from 'react';
import PropTypes from 'prop-types';

import Home from 'src/components/Home';
import Log from 'src/components/Log';
import Nav from 'src/containers/Nav';
import Bases from 'src/containers/Bases';
import Empire from 'src/components/Empire';
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
      {isLogged === true && page === "login" && <Bases />}
      {isLogged === true && page === "bases" && <Bases />}
      {isLogged === true && page === "map" && <Map />}
      {isLogged === true && page === "empire" && <Empire />}
    </>
  );
};

App.propTypes = {
  page: PropTypes.string.isRequired,
  isLogged: PropTypes.bool.isRequired,
};

export default App;
