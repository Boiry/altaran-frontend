import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

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
  // Translations
  const { t } = useTranslation('map');

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

  // If entered coordinates are wrong
  const info2 = useRef();
  const [reset, setReset] = useState(false);
  let timeout1 = useRef();
  let timeout2 = useRef();
  const noSystem = () => {
    info2.current.classList.remove("galaxy-no-system-info-fade-out");
    clearTimeout(timeout1.current);
    clearTimeout(timeout2.current);
    if (galaxySelector === "region") {info2.current.textContent = `${t("no region")}`}
    if (galaxySelector === "sector") {info2.current.textContent = `${t("no sector")}`}
    if (galaxySelector === "starSystem") {info2.current.textContent = `${t("no system")}`}
    info2.current.style.display = "block";
    setReset(true);
    timeout1.current = setTimeout(() => {
      info2.current.classList.add("galaxy-no-system-info-fade-out");
    }, 2000);
    timeout2.current = setTimeout(() => {
      info2.current.style.display = "none";
      info2.current.classList.remove("galaxy-no-system-info-fade-out");
    }, 3000);
  }

  const restore = () => {setReset(false)}

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
          noSystem={noSystem}
        />
      </div>
      <div ref={info} className="galaxy-star-info" tabIndex="1" onBlur={hideInfo}>
        <p ref={name} className="galaxy-star-info-name"></p>
        <p ref={coordinates} className="galaxy-star-into-coordinates"></p>
        <button className="galaxy-star-info-button" onMouseDown={() => clickOnGoStarSystem()}>Y aller</button>
      </div>
      <div ref={info2} className="galaxy-no-system-info"></div>
      <Aside reset={reset} restore={restore} />
    </>
  );
};

export default Galaxy;
