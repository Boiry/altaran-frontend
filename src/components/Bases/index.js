import React, { useEffect, useState } from 'react';

import Tab from 'src/containers/Tab';

import './bases.scss';
import Background from 'src/assets/images/background3.jpg';
import BaseSelector from './BaseSelector';
import Description from './Description';
import Facilities from 'src/containers/Bases/Facilities';
import Defenses from './Defenses';
import Ships from './Ships';
import Infantry from './Infantry';
import Technologies from 'src/containers/Bases/Technologies';
import Aside from 'src/containers/Bases/Aside';

const Bases = ({ selectedBase, changeSelectedBase }) => {
  // document.body.style.background = "linear-gradient(30deg, #00152b, #003f66)";
  document.body.style.background = `url(${Background})`;

  const [subPage, changeSubPage] = useState("description");

  const tabs = {
    "Description": "description",
    "Bâtiments": "facilities",
    "Défenses": "defenses",
    "Flotte": "ships",
    "Troupes": "infantry",
    "Technologies": "technologies"
  };


  useEffect(() => {
    // To prevent re-render of base selector, selected base is computed here
    const bases = document.getElementsByClassName("base-selector-base");
    for (let i=1; i<=bases.length; i++) {
      if (selectedBase === "base"+i) {
        bases[i-1].classList.add("selected-base");
        bases[i-1].style.width = "3.5rem";
      }
    }
  }, []);

  return (
    <>
      <div className="bases">

        <div className="base-selector">
          <BaseSelector handleClick={changeSelectedBase} />
        </div>

        <div className="bases-content">
          <Tab name={"bases"} tabs={tabs} dispatchSubPage={changeSubPage} />
          {subPage === 'description' && <Description />}
          {subPage === 'facilities' && <Facilities />}
          {subPage === 'defenses' && <Defenses />}
          {subPage === 'ships' && <Ships />}
          {subPage === 'infantry' && <Infantry />}
          {subPage === 'technologies' && <Technologies />}
        </div>
      </div>

      <Aside />

      <div className="soft-description">
        <p className="selector-base-name">Planète de merde</p>
        <p className="selector-base-coordinates">(coordonnées)</p>
      </div>
    </>
  );
};

export default Bases;
