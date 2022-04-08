import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Administration from 'src/components/Administration';
import Bases from 'src/containers/Bases';
import Communications from 'src/components/Communications';
import Confirmation from 'src/containers/Confirmation';
import ResetPassword from 'src/containers/Connection/ResetPassword';
import Empire from 'src/components/Empire';
import Home from 'src/containers/Home';
import Log from 'src/components/Log';
import Map from 'src/components/Map';
import MiniChat from 'src/containers/MiniChat';
import Nav from 'src/containers/Nav';

const App = ({ page, isLogged, miniChat }) => {
  // if (window.sessionStorage.token) {
  //   isLogged = true;
  // }
  const [location, setLocation] = useState();
  useEffect(() => {
    const path = window.location.pathname;
    if (path.substring(0, 20) === '/registrationConfirm') {
      setLocation("confirmation");
    } else if (path.substring(0, 14) === '/resetPassword') {
      setLocation("resetPassword");
    }
  }, [])
  return (
    <>
      {location === "confirmation" && <Confirmation />}
      {location === "resetPassword" && <ResetPassword />}
      {isLogged === false && location !== "confirmation" && location !== "resetPassword" && <Home />}
      {isLogged === true && <Log />}
      {isLogged === true && <Nav />}
      {isLogged === true && page !== "communications" && miniChat && <MiniChat />}
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
