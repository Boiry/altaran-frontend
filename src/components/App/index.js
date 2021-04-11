import React from 'react';
import PropTypes from 'prop-types';

import Header from 'src/components/Header';
import Connection from 'src/components/Connection';
import HomeOverview from 'src/components/HomeOverview';
import HomeEmpires from 'src/components/HomeEmpires';
import HomeStory from 'src/components/HomeStory';
import HomeMedia from 'src/components/HomeMedia';
import Frame from 'src/components/Frame';
import Map from 'src/components/Map';
import Planets from 'src/components/Planets';

const App = ({ page, isLogged }) => (
  <div className="app">
    <Header />
    {page === "login" && <Connection />}
    {page === "register" && <Connection />}
    {page === "home-overview" && <HomeOverview />}
    {page === "home-empires" && <HomeEmpires />}
    {page === "home-story" && <HomeStory />}
    {page === "home-media" && <HomeMedia />}
    {isLogged && <Frame />}
    {page === "game-map" && <Map />}
    {page === "game-planets" && <Planets />}
  </div>
);

App.propTypes = {
  page: PropTypes.string.isRequired,
  isLogged: PropTypes.bool.isRequired,
};

export default App;
