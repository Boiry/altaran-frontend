import React, { useEffect, useState, useRef } from 'react';

import Aside from 'src/containers/Map/Galaxy/Aside';
import SceneComponent from "./sceneComponent";

import './galaxy.scss';

const Galaxy = ({
  launchFetchStarSystem,
  goToStarSystemPage,
  starSystemName,
  changeField,
  launchDeleteStarSystemName,
  getCameraPosition,
  setCameraPosition,
  galaxySelector,
  galaxyRegion,
  galaxySector,
  galaxyStarSystem,
  highlight,
  isolate,
  goAndSee,
  setGoAndSee,
}) => {

  // ==================== INPUTS ======================

  const info = useRef();
  const name = useRef();
  const coordinates = useRef();
  let [regionSelected, setRegionSelected] = useState();
  let [sectorSelected, setSectorSelected] = useState();
  let [starSystemSelected, setStarSystemSelected] = useState();
  
  const showStarSystemInfo = (region, sector, starSystem) => {
    launchDeleteStarSystemName();
    launchFetchStarSystem(region, sector, starSystem);
    setRegionSelected(region);
    setSectorSelected(sector);
    setStarSystemSelected(starSystem);
    const coordinatesString = `${region} : ${sector} : ${starSystem}`;
    coordinates.current.textContent = coordinatesString;
    name.current.style.fontSize = "1rem";
    name.current.style.fontStyle = "italic";
    name.current.textContent = "Chargement...";
    info.current.style.display = "block";
    setTimeout(() => {info.current.focus()}, 500);
  }

  useEffect(() => {
    name.current.style.fontSize = "1.4rem";
    name.current.style.fontStyle = "none";
    name.current.textContent = starSystemName;
  }, [starSystemName])

  const clickOnGoStarSystem = () => {
    changeField(regionSelected, 'region');
    changeField(sectorSelected, 'sector');
    changeField(starSystemSelected, 'starSystem');
    goToStarSystemPage();
  }

  const hideInfo = () => {
    info.current.style.display = "none";
  }

  useEffect(() => {
    hideInfo();
  }, []);

  return (
    <>
      <div className="galaxy">
        <SceneComponent
          antialias
          id="canvas"
          tabIndex="0"
          showStarSystemInfo={showStarSystemInfo}
          cameraPosition={getCameraPosition}
          setCameraPosition={setCameraPosition}
          galaxySelector={galaxySelector}
          galaxyRegion={galaxyRegion}
          galaxySector={galaxySector}
          galaxyStarSystem={galaxyStarSystem}
          highlight={highlight}
          isolate={isolate}
          goAndSee={goAndSee}
          setGoAndSee={setGoAndSee}
        />
      </div>
      <div ref={info} className="galaxy-star-info" tabIndex="1" onBlur={hideInfo}>
        <p ref={name} className="galaxy-star-info-name"></p>
        <p ref={coordinates} className="galaxy-star-into-coordinates"></p>
        <button className="galaxy-star-info-button" onMouseDown={() => clickOnGoStarSystem()}>Y aller</button>
      </div>
      <Aside />
    </>
  );
};

export default Galaxy;
