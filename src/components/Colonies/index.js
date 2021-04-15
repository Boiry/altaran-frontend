import React, { useEffect, useState } from 'react';

import { planetSelector, tab } from './animations.js';
import './colonies.scss';

import Planet1 from 'src/assets/images/planet1.png';
import Planet2 from 'src/assets/images/planet2.png';
import Planet3 from 'src/assets/images/planet3.png';
import Planet4 from 'src/assets/images/planet4.png';
import Planet5 from 'src/assets/images/planet5.png';
import Planet6 from 'src/assets/images/planet6.png';

import Description from './Description';
import Facilities from './Facilities';
import Defenses from './Defenses';
import Fleet from './Fleet';
import Infantry from './Infantry';
import Technology from './Technology';

const Colonies = () => {
  document.body.style.background = "linear-gradient(30deg, #00152b, #003f66)";
  
  const [subPage, changeSubPage] = useState("description");

  useEffect(() => {
    planetSelector();
    tab(subPage);
  });

  return (
    <>
      <div className="colonies">

        <div className="planet-selector">
          <img src={Planet1} className="planet-selector-planet" />
          <img src={Planet2} className="planet-selector-planet" />
          <img src={Planet3} className="planet-selector-planet" />
          <img src={Planet4} className="planet-selector-planet" />
          <img src={Planet5} className="planet-selector-planet" />
          <img src={Planet6} className="planet-selector-planet" />
          <img src={Planet1} className="planet-selector-planet" />
          <img src={Planet2} className="planet-selector-planet" />
          <img src={Planet3} className="planet-selector-planet" />
          <img src={Planet4} className="planet-selector-planet" />
          <img src={Planet5} className="planet-selector-planet" />
          <img src={Planet6} className="planet-selector-planet" />
          <img src={Planet1} className="planet-selector-planet" />
          <img src={Planet2} className="planet-selector-planet" />
          <img src={Planet3} className="planet-selector-planet" />
          <img src={Planet4} className="planet-selector-planet" />
          <img src={Planet5} className="planet-selector-planet" />
          <img src={Planet6} className="planet-selector-planet" />
          <img src={Planet1} className="planet-selector-planet" />
          <img src={Planet2} className="planet-selector-planet" />
          <img src={Planet3} className="planet-selector-planet" />
          <img src={Planet4} className="planet-selector-planet" />
          <img src={Planet5} className="planet-selector-planet" />
          <img src={Planet6} className="planet-selector-planet" />
          <img src={Planet1} className="planet-selector-planet" />
        </div>

        <div className="colonies-content">
          <div className="colonies-tab-container">
            <button className="colonies-tab colonies-tab-inactive" onClick={() => changeSubPage('description')}>Descriptif</button>
            <button className="colonies-tab colonies-tab-inactive" onClick={() => changeSubPage("facilities")}>Bâtiments</button>
            <button className="colonies-tab colonies-tab-inactive" onClick={() => changeSubPage('defenses')}>Défenses</button>
            <button className="colonies-tab colonies-tab-inactive" onClick={() => changeSubPage('fleet')}>Flotte</button>
            <button className="colonies-tab colonies-tab-inactive" onClick={() => changeSubPage('infantry')}>Troupes au sol</button>
            <button className="colonies-tab colonies-tab-inactive" onClick={() => changeSubPage("technology")}>Technologie</button>
          </div>
          {subPage === 'description' && <Description />}
          {subPage === 'facilities' && <Facilities />}
          {subPage === 'defenses' && <Defenses />}
          {subPage === 'fleet' && <Fleet />}
          {subPage === 'infantry' && <Infantry />}
          {subPage === 'technology' && <Technology />}
        </div>
      </div>

      <div className="soft-description">
      <p className="selector-planet-name">Planète de merde</p>
      <p className="selector-planet-coordinates">(coordonnées)</p>
      </div>
    </>
  );
};

export default Colonies;
