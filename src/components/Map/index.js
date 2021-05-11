import React, { useState } from 'react';

import Tab from 'src/containers/Tab';

import Galaxy from 'src/containers/Map/Galaxy';
import StarSystem from 'src/containers/Map/StarSystem';

import './map.scss';

const Map = () => {
  const [subPage, changeSubPage] = useState("galaxy");
  const tabs = {
    "Galaxie": "galaxy",
    "Systèmes stellaires": "starSystem",
  };
  
  return (
    <div className="map">
       <Tab name={"map"} tabs={tabs} dispatchSubPage={changeSubPage} />
      {subPage === "galaxy" && <Galaxy />}
      {subPage === "starSystem" && <StarSystem />}
    </div>
  );
};

export default Map;
