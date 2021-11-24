import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import Field from '../Field';
import EntityInfo from './EntityInfo';

import SceneComponent from "./sceneComponent";

import './starSystem.scss';

import ArrowLeft from 'src/assets/images/arrow-left.svg';
import ArrowRight from 'src/assets/images/arrow-right.svg';

const StarSystem = ({
  region,
  sector,
  starSystem,
  changeField, 
  fetchStarSystem,
  fetchRegions,
  regionsInfo,
  fetchSectors,
  sectorsInfo,
  fetchStarSystems,
  starSystemsInfo,
  sectorsAreLoading,
  starSystemsAreLoading,
  starSystemIsLoading,
  setCurrentRegion,
  currentRegion,
  setCurrentSector,
  currentSector,
  setCurrentStarSystem,
  currentStarSystem,
  starSystemInfo,
}) => {
  const { t } = useTranslation('map');

  // ================== HANDLE OF INPUTS ==================

  const systemName = useRef();
  const [starSystemName, setStarSystemName] = useState('');
  const list = useRef();
  const [go, letsGo] = useState(false);
  const [findLastSector, doFindLastSector] = useState(false);
  const [findLastSystem, doFindLastSystem] = useState(false);

  // Fetch star system infos on go
  useEffect(() => {
    if (go) {
      fetchStarSystem(region, sector, starSystem);
      setCurrentRegion(region);
      setCurrentSector(sector);
      setCurrentStarSystem(starSystem);
      letsGo(false);    
    }
  }, [go]);

  // When loading
  useEffect(() => {
    if (systemName.current) {
      if (starSystemIsLoading) {
        systemName.current.style.fontStyle = "italic";
        setStarSystemName(t("loading"));
      } else {
        systemName.current.style.fontStyle = "normal";
      }
    }
  }, [starSystemIsLoading]);

  // If the coordinates are wrong
  useEffect(() => {
    if (starSystemInfo !== 'no system') {
      setStarSystemName(starSystemInfo.name);
    } else {
      setStarSystemName(t("no system"));
    }
  }, [starSystemInfo]);

  // Handle changes of coordinates when navigating
  useEffect(() => {
    if (findLastSystem && !starSystemsAreLoading) {
      changeField(starSystemsInfo.length, 'starSystem');
      letsGo(true);
      doFindLastSystem(false);
    }
    if (findLastSector && !sectorsAreLoading) {
      changeField(region - 1, 'region');
      changeField(sectorsInfo.length, 'sector');
      fetchStarSystems(region - 1, sectorsInfo.length);
      doFindLastSystem(true);
      doFindLastSector(false);
    }
  })

  // Handle Return
  const handleSubmit = (e) => {
    e.preventDefault();
    if (region && sector && starSystem) {
      if (region !== currentRegion) {
        fetchSectors(region);
      }
      if (sector !== currentSector) {
        fetchStarSystems(region, sector);
      }
      if (currentRegion !== region || currentSector !== sector || currentStarSystem !== starSystem) {
        letsGo(true);
      }
    }
  }

  // Navigating in star systems (left and right)
  const navigate = (direction) => {
    if (region && sector && starSystem) {
      switch (direction) {
        case "left":
          if (starSystem > 1) {
            changeField(starSystem - 1, 'starSystem');
            letsGo(true);
          } else if (sector > 1) {
            fetchStarSystems(region, sector - 1);
            changeField(sector - 1, 'sector');
            doFindLastSystem(true);
          } else if (region > 1) {
            fetchSectors(region - 1);
            doFindLastSector(true);
          }
          break;
        case "right":
          if (starSystem < starSystemsInfo.length) {
            changeField(parseInt(starSystem) + 1, 'starSystem');
            letsGo(true);
          } else if (sector < sectorsInfo.length) {
            fetchStarSystems(region, parseInt(sector) + 1);
            changeField(1, 'starSystem');
            changeField(parseInt(sector) + 1, 'sector');
            letsGo(true);
          } else if (region < 50) {
            fetchStarSystems(parseInt(region) + 1, 1);
            changeField(parseInt(region) + 1, 'region');
            changeField(1, 'sector');
            changeField(1, 'starSystem');
            letsGo(true);
          }
          break;
      }
    }
  }

  // Click on arrow
  const handleClickArrow = (e) => {
    e.target.name === "arrowLeft" ? navigate("left") : navigate("right");
  }

  // Press keyboard's arrows
  document.onkeydown = (e) => {
    if (e.code === "ArrowLeft") {
      navigate("left");
    } else if (e.code === "ArrowRight") {
      navigate("right");
    }
  }

  // Automatically display star system when component mounts
  useEffect(() => {
    if (region && sector && starSystem) {
      if (!sectorsInfo) fetchSectors(region);
      if (!starSystemsInfo) fetchStarSystems(region, sector);
      letsGo(true);
    }
    fetchRegions();
  }, [])


  // =================== LISTS ====================

  const [listContent, setListContent] = useState([]);

  const clickOnSelector = (element) => {
    const target = element.split('-')[1];
    let infos;
    switch (target) {
      case 'region':
        if (regionsInfo) {
          infos = regionsInfo;
        }
        break;
      case 'sector':
        if (regionsInfo && sectorsInfo) {
          infos = sectorsInfo;
        }
        break;
      case 'starSystem':
        if (regionsInfo && sectorsInfo && starSystemsInfo) {
          infos = starSystemsInfo;
        }
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
      list.current.scrollTop = 0;
      list.current.style.visibility = "hidden";
    }
  }

  const clickOnListItem = (field, item) => {
    hideList();
    changeField(item, field);
    let system;
    switch (field) {
      case 'region':
        fetchSectors(item);
        changeField('', 'sector');
        changeField('', 'starSystem');
        break;
      case 'sector':
        fetchStarSystems(region, item);
        changeField('', 'starSystem');
        break;
      case 'starSystem':
        system = item;
        break;
    }
    if (region && sector && system) {
      letsGo(true);
    }
  }

  // Show entities infos
  const [entityInfos, setEntityInfos] = useState({id: '', name: '', type: ''});
  const showEntityInfo = (id, name, type) => {
    setEntityInfos({...entityInfos, id, name, type});
  }

  // Hide entities infos when changing star system
  useEffect(() => {
    if (go) {
      setEntityInfos({...entityInfos, id: '', name: '', type: ''});
    }
  }, [go]);

  return (
    <div className="star-system">
      <SceneComponent antialias id="canvas" tabIndex="0" starSystemInfo={starSystemInfo} showEntityInfo={showEntityInfo} />
      {region && sector && starSystem &&
        <div ref={systemName} className="star-system-info">{starSystemName}</div>
      }
      <form className="star-system-navigation" onSubmit={handleSubmit}>
        <img src={ArrowLeft} className="star-system-arrow" name="arrowLeft" onClick={handleClickArrow} />
        <Field
          name="region"
          CSSName="starSystem"
          type="string"
          value={region}
          onChange={changeField}
          onClick={clickOnSelector}
        />
        <span className="star-system-separator"> : </span>
         <Field
          name="sector"
          CSSName="starSystem"
          type="string"
          value={sector}
          onChange={changeField}
          onClick={clickOnSelector}
        />
        <span className="star-system-separator"> : </span>
        <Field
          name="starSystem"
          CSSName="starSystem"
          type="string"
          value={starSystem}
          onChange={changeField}
          onClick={clickOnSelector}
        />
        <img src={ArrowRight} className="star-system-arrow" name="arrowRight" onClick={handleClickArrow} />
        <button type="submit" className="star-system-button"></button>
      </form>

      {entityInfos.id && <EntityInfo id={entityInfos.id} name={entityInfos.name} type={entityInfos.type} />}      

      <div ref={list} onBlur={hideList} tabIndex="0" className="star-system-list">
        {listContent.map(listItem => (
            <p
              key={listItem.key}
              className="star-system-list-item"
              onClick={() => clickOnListItem(listItem.field, listItem.id)}
            >
              {listItem.id}. {listItem.name}
            </p>
        ))}
      </div>

    </div>
  );
};

export default StarSystem;
