import React, { useEffect, useState, useRef } from 'react';

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
    name.current.textContent = "Loading...";
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
        />
      </div>
      <div ref={info} className="galaxy-star-info" tabIndex="1" onBlur={hideInfo}>
        <p ref={name} className="galaxy-star-info-name">Test</p>
        <p ref={coordinates} className="galaxy-star-into-coordinates">Test test test</p>
        <button className="galaxy-star-info-button" onMouseDown={() => clickOnGoStarSystem()}>Y aller</button>
      </div>
      <aside className="aside"></aside>
    </>
  );
};

export default Galaxy;
