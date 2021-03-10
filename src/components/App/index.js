import React from 'react';
import PropTypes from 'prop-types';

import Header from 'src/components/Header';
import Connection from 'src/components/Connection';
import HomeOverview from 'src/components/HomeOverview';
import HomeEmpires from 'src/components/HomeEmpires';
import HomeStory from 'src/components/HomeStory';
import HomeMedia from 'src/components/HomeMedia';

const App = ({ page }) => (
  <div className="app">
    <Header />
    {page === "login" && <Connection />}
    {page === "register" && <Connection />}
    {page === "home-overview" && <HomeOverview />}
    {page === "home-empires" && <HomeEmpires />}
    {page === "home-story" && <HomeStory />}
    {page === "home-media" && <HomeMedia />}
  </div>
);

App.propTypes = {
  page: PropTypes.string.isRequired,
};

export default App;
