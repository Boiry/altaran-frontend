import React from 'react';
import PropTypes from 'prop-types';

import Home from 'src/containers/Home';
import Log from 'src/components/Log';
import Nav from 'src/containers/Nav';
import MiniChat from 'src/containers/MiniChat';
import Bases from 'src/containers/Bases';
import Empire from 'src/components/Empire';
import Communications from 'src/components/Communications';
import Map from 'src/components/Map';
import Administration from 'src/components/Administration';

const App = ({ page, isLogged }) => {
  // if (window.sessionStorage.token) {
  //   isLogged = true;
  // }
  return (
    <>
      {isLogged === false && <Home />}
      {isLogged === true && <Log />}
      {isLogged === true && <Nav />}
      {isLogged === true && page !== "communications" && <MiniChat />}
      {isLogged === true && page === "empire" && <Empire />}
      {isLogged === true && page === "bases" && <Bases />}
      {isLogged === true && page === "communications" && <Communications />}
      {isLogged === true && page === "map" && <Map />}
      {isLogged === true && page === "administration" && <Administration />}
    </>
  );
};

App.propTypes = {
  page: PropTypes.string.isRequired,
  isLogged: PropTypes.bool.isRequired,
};

export default App;
