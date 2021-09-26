import React, { useEffect, useState, useRef } from 'react';

import Field from 'src/components/Map/Field';

import './aside.scss';

import Corner from 'src/assets/images/corner.svg';

const Aside = ({
  setGalaxySelector,
  galaxySelector,
  galaxyRegion,
  galaxySector,
  galaxyStarSystem,
  changeField,
  launchFetchRegions,
  regionsInfo,
  launchFetchSectors,
  sectorsInfo,
  launchFetchStarSystems,
  starSystemsInfo,
  highlight,
  isolate,
  goAndSee,
  highlighted,
  isolated,
}) => {
  // ============ SELECTOR ===============
  const selector = useRef();
  const selectorOptions = useRef();
  const [selectorOpened, setSelectorOpened] = useState(false);
  const table = {
    region: "Chercher une région ▼",
    sector: "Chercher un secteur ▼",
    starSystem: "Chercher un système stellaire ▼"
  }
  
  useEffect(() => {
    selector.current.textContent = table[galaxySelector];
  }, [galaxySelector])

  const openSelector = () => {
    if (selectorOpened === true) {
      setSelectorOpened(false);
    } else {
      setSelectorOpened(true);
    }
  }

  const clickOnOption = (option) => {
    setGalaxySelector(option);
    setSelectorOpened(false);
  }

  const stopFiltering = () => {
    highlight(false);
    if (highlightButton.current.classList.contains("galaxy-aside-form-button-active")) {
      highlightButton.current.classList.remove("galaxy-aside-form-button-active");
    }
    isolate(false);
    if (isolateButton.current.classList.contains("galaxy-aside-form-button-active")) {
      isolateButton.current.classList.remove("galaxy-aside-form-button-active");
    }
  }

  const updateField = (value, name) => {
    changeField(value, name);
    stopFiltering();
  }

  // =================== LISTS ====================
  const list = useRef();
  const [listContent, setListContent] = useState([]);
  const [regionScrollPosition, setRegionScrollPosition] = useState()
  const [sectorScrollPosition, setSectorScrollPosition] = useState()
  const [starSystemScrollPosition, setStarSystemScrollPosition] = useState()

  useEffect(() => {
    launchFetchRegions();
  }, [])

  const clickOnSelector = (element) => {
    const target = element.split('-')[1];
    let infos;
    switch (target) {
      case 'galaxyRegion':
        if (regionsInfo) {
          infos = regionsInfo;
        }
        list.current.scrollTop = regionScrollPosition;
        break;
      case 'galaxySector':
        if (sectorsInfo) {
          infos = sectorsInfo;
        } else {
          infos = null;
        }
        list.current.scrollTop = sectorScrollPosition;
        break;
      case 'galaxyStarSystem':
        if (starSystemsInfo) {
          infos = starSystemsInfo;
        } else {
          infos = null;
        }
        list.current.scrollTop = starSystemScrollPosition;
        break;
    }
    if (infos) {
      setListContent([]);
      for (let i=0; i<infos.length; i++) {
        setListContent(listContent => [
          ...listContent,
          {
            key: `listItem${i+1}id`,
            id: infos[i].num,
            name: infos[i].name,
            field: target,
          }
        ])
      }
      list.current.style.visibility = "visible";
      list.current.focus();
    }
  }
  
  const hideList = () => {
    if (list.current) {
      list.current.style.visibility = "hidden";
    }
  }

  const clickOnListItem = (field, item) => {
    hideList();
    updateField(item, field);
    if (field === 'galaxyRegion') {
      launchFetchSectors(item);
      updateField('', 'galaxySector');
      updateField('', 'galaxyStarSystem');
      setRegionScrollPosition(list.current.scrollTop);
      setSectorScrollPosition(0);
      setStarSystemScrollPosition(0);
    } else if (field === 'galaxySector') {
      launchFetchStarSystems(galaxyRegion, item);
      updateField('', 'galaxyStarSystem');
      setSectorScrollPosition(list.current.scrollTop);
      setStarSystemScrollPosition(0);
    } else {
      setStarSystemScrollPosition(list.current.scrollTop);
    }
  }

  // =============== BUTTONS ==================
  const highlightButton = useRef();
  const isolateButton = useRef();
  const goButton = useRef();

  const checkInputs = () => {
    if (galaxySelector === "region" && galaxyRegion ||
        galaxySelector === "sector" && galaxyRegion && galaxySector ||
        galaxySelector === "starSystem" && galaxyRegion && galaxySector && galaxyStarSystem
    ) {
      return true;
    }
    return false;
  }

  const clickOnHighlight = () => {
    if (checkInputs() === true) {
      if (highlightButton.current.classList.contains("galaxy-aside-form-button-active")) {
        highlightButton.current.classList.remove("galaxy-aside-form-button-active");
        highlight(false);
      } else {
        highlightButton.current.classList.add("galaxy-aside-form-button-active");
        isolateButton.current.classList.remove("galaxy-aside-form-button-active");
        isolate(false);
        highlight(true);
      }
    }
  }

  const clickOnIsolate = () => {
    if (checkInputs() === true) {
      if (isolateButton.current.classList.contains("galaxy-aside-form-button-active")) {
        isolateButton.current.classList.remove("galaxy-aside-form-button-active");
        isolate(false);
      } else {
        isolateButton.current.classList.add("galaxy-aside-form-button-active");
        highlightButton.current.classList.remove("galaxy-aside-form-button-active");
        highlight(false);
        isolate(true);
      }
    }
  }

  const animateButton = (key) => {
    if (checkInputs() === true) {
      if (key === 'down') {
        goButton.current.classList.add('galaxy-aside-form-button-go-active');
      } else {
        goButton.current.classList.remove('galaxy-aside-form-button-go-active');
      }
    }
  }

  const go = () => {
    if (checkInputs() === true)
    goAndSee(true)
  }

  // When page's reload
  useEffect(() => {
    if (highlighted === true) {
      highlightButton.current.classList.add("galaxy-aside-form-button-active");
    }
    if (isolated === true) {
      isolateButton.current.classList.add("galaxy-aside-form-button-active");
    }
  }, []);

  return (
    <div className="galaxy-aside">
      <h1 className="galaxy-aside-title">Options de filtrage :</h1>

      <div ref={selector} className="galaxy-aside-selector" onClick={() => openSelector()}></div>
      {selectorOpened &&
        <div ref={selectorOptions} className="galaxy-aside-selector-options">
          <div className="galaxy-aside-selector-item" onClick={() => clickOnOption("region")}>Chercher une région</div>
          <div className="galaxy-aside-selector-item" onClick={() => clickOnOption("sector")}>Chercher un secteur</div>
          <div className="galaxy-aside-selector-item" onClick={() => clickOnOption("starSystem")}>Chercher un système stellaire</div>
        </div>
      }

      <div className="galaxy-aside-fields">
        {galaxySelector === "region" &&
          <Field name="galaxyRegion" CSSName="galaxy" type="string" value={galaxyRegion} onChange={updateField} onClick={clickOnSelector} />
        }
        {galaxySelector === "sector" &&
          <>
          <Field name="galaxyRegion" CSSName="galaxy" type="string" value={galaxyRegion} onChange={updateField} onClick={clickOnSelector} />
          <span className="galaxy-aside-separator"> : </span>
          <Field name="galaxySector" CSSName="galaxy" type="string" value={galaxySector} onChange={updateField} onClick={clickOnSelector} />
          </>
        }
        {galaxySelector === "starSystem" &&
          <>
          <Field name="galaxyRegion" CSSName="galaxy" type="string" value={galaxyRegion} onChange={updateField} onClick={clickOnSelector} />
          <span className="galaxy-aside-separator"> : </span>
          <Field name="galaxySector" CSSName="galaxy" type="string" value={galaxySector} onChange={updateField} onClick={clickOnSelector} />
          <span className="galaxy-aside-separator"> : </span>
          <Field name="galaxyStarSystem" CSSName="galaxy" type="string" value={galaxyStarSystem} onChange={updateField} onClick={clickOnSelector} />
          </>
        }
      </div>

      <form className="galaxy-aside-form">
        <div ref={highlightButton} className="galaxy-aside-form-button" onClick={() => clickOnHighlight()}>Mettre en évidence</div>
        <div ref={isolateButton} className="galaxy-aside-form-button" onClick={() => clickOnIsolate()}>Isoler</div>
        <div ref={goButton} className="galaxy-aside-form-button-go" onMouseDown ={() => animateButton('down')} onMouseUp={() => animateButton('up')} onClick={() => go()}>Y aller</div>
      </form>

      <div ref={list} onBlur={hideList} tabIndex="0" className="galaxy-aside-list">
        {listContent.map(listItem => (
          <p
            key={listItem.key}
            className="galaxy-aside-list-item"
            onClick={() => clickOnListItem(listItem.field, listItem.id)}
          >
            {listItem.id}. {listItem.name}
          </p>
        ))}
      </div>

      <img src={Corner} className="corner corner-top-left" />
      <img src={Corner} className="corner corner-top-right" />
      <img src={Corner} className="corner corner-bottom-left" />
      <img src={Corner} className="corner corner-bottom-right" />
    </div>
  )
}

export default Aside;
