import React, { useEffect, useState } from 'react';

import { tab } from './animations.js';

import Galaxy from './Galaxy';
import StarSystem from './StarSystem';

import './map.scss';

const Map = () => {
  const [subPage, changeSubPage] = useState("galaxy");
  useEffect(() => {
    tab(subPage);
  });
  return (
    <div className="map">
      <div className="map-tab-container">
        <button className="map-tab map-tab-inactive" onClick={() => changeSubPage('galaxy')}>Galaxie</button>
        <button className="map-tab map-tab-inactive" onClick={() => changeSubPage("starSystem")}>Systèmes stellaires</button>
      </div>
      {subPage === "galaxy" && <Galaxy />}
      {subPage === "starSystem" && <StarSystem />}
    </div>
  );
};

export default Map;
