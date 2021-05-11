import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Item from '../Item';
import { cTable1, cTable2 } from './correspondenceTable.js';
import { msToDuration, msToDate, countdown, timestampToDate } from 'src/utils/Timer';
import { init } from './overItemsHandler.js';

import './technologies.scss';

import Empty from 'src/assets/images/icons/empty.svg';
import Laser from 'src/assets/images/icons/laser.svg';
import Fission from 'src/assets/images/icons/fission.svg';
import Ballistic from 'src/assets/images/icons/ballistic.svg';
import Frame1 from 'src/assets/images/icons/frame1.svg';
import Propulsion from 'src/assets/images/icons/propulsion.svg';
import Knowledge from 'src/assets/images/icons/knowledge.svg';
import Ia from 'src/assets/images/icons/ia.svg';
import Computer from 'src/assets/images/icons/computer.svg';
import Geophysics from 'src/assets/images/icons/geophysics.svg';
import Energy from 'src/assets/images/icons/energy.svg';
import Security from 'src/assets/images/icons/security.svg';
import Nanotechnology from 'src/assets/images/icons/nanotechnology.svg';
import Particle from 'src/assets/images/icons/particle.svg';
import Weapon from 'src/assets/images/icons/weapon.svg';
import Frame2 from 'src/assets/images/icons/frame2.svg';
import Distortion from 'src/assets/images/icons/distortion.svg';
import Geospatial from 'src/assets/images/icons/geospatial.svg';
import Neuronal from 'src/assets/images/icons/neuronal.svg';
import Subatomic from 'src/assets/images/icons/subatomic.svg';
import Transmutation from 'src/assets/images/icons/transmutation.svg';
import Expansion from 'src/assets/images/icons/expansion.svg';
import Darkmatter from 'src/assets/images/icons/darkmatter.svg';
import Core from 'src/assets/images/icons/core.svg';
import Module from 'src/assets/images/icons/module.svg';
import Repair from 'src/assets/images/icons/repair.svg';
import Frame3 from 'src/assets/images/icons/frame3.svg';

const Technologies = ({
  launchFetchTechnologies,
  selectedBase,
  currentTechnology,
  technologies,
  changeTechnology,
  launchFetchTechnologiesUpdates,
  updates,
}) => {
  // Translations
  const { t } = useTranslation('technologies');

  // Initialization
  useEffect(() => {
    if (!technologies) {
      launchFetchTechnologies();
    }
    if (!currentTechnology) {
      setCurrentTechnology("laser");
      const currentItem = document.getElementsByClassName("item-laser")[0];
      currentItem.classList.add("item-is-active");
    }
    if (!updates) {
      launchFetchTechnologiesUpdates();
    }
  }, [selectedBase]);

  // Launch animations on hover icons
  useEffect(() => {
    init();
  });

  // Function for highlighting the active icon
  const highlightIcon = (item) => {
    const itemIcon = document.getElementsByClassName("item-icon");
    const size = Object.keys(cTable1).length + 5;
    for (let i=0; i<size; i++) {
      itemIcon[i].classList.remove("item-is-active")
    }
    const currentItem = document.getElementsByClassName(`item-${item}`)[0];
    currentItem.classList.add("item-is-active");
  }

  // Hightlight icon when render
  useEffect(() => {
    if (updates) {
      const item = currentTechnology;
      highlightIcon(item);
    }
  });

  // Handle click on icon
  const setCurrentTechnology = (item) => {
    const name = `${selectedBase}CurrentTechnology`;
    changeTechnology(name, item);
  };

  // For rendering of the end of research
  const [endOfResearch, setEndOfResearch] = useState("");
  useEffect(() => {
    function setDate() {
      if (currentTechnology && technologies) {
        let date;
        if (currentTechnology.match(/^update/)) {
          let updateNumber = currentTechnology.split('-');
          updateNumber = updateNumber[0];
          date = msToDate(updates[updateNumber].time);
        } else {
          date = msToDate(technologies[currentTechnology].time);
        }
        setEndOfResearch(date);
      }
    }
    setDate();
    const iterator = setInterval(setDate, 1000);
    return () => {
      clearInterval(iterator);
    };
  });

  // For rendering the countdown of researched technology
  const [delay, setDelay] = useState();
  useEffect(() => {
    function timer() {
      if (updates && currentTechnology.match(/^update/)) {
        setDelay(countdown(updates[currentTechnology.split('-')[0]].time));
      }
    }
    timer();
    const iterator = setInterval(timer, 1000);
    return () => {
      clearInterval(iterator);
    };
  });

  // Toggle for rendering item from menu or from update list
  let showActions;
  if (currentTechnology) {
    const test = currentTechnology.match(/^update/);
    test ? showActions = "showResearch" : showActions = "showItem";
  }

  // Displaying the corresponding picture and title
  let displayedImage, title;
  if (currentTechnology && technologies) {
    const test = currentTechnology.match(/^update/);
    if (test) {
      const nameArray = currentTechnology.split('-');
      displayedImage = cTable1[nameArray[1]];
      title = `${cTable2[nameArray[1]]} (${t("nextLevel")} ${parseInt(technologies[nameArray[1]].level)+1})`;
    }
    else {
      displayedImage = cTable1[currentTechnology];
      title = `${cTable2[currentTechnology]} (${t("level")} ${technologies[currentTechnology].level})`;
    }
  }
  
  return (
    <>
      <div className="technologies-main">
        <img src={currentTechnology && displayedImage} className="technologies-image" alt=""/>
        <div className="technologies-actions">
          <div className="technologies-actions-title">{currentTechnology && title}</div>
          {showActions === 'showItem' &&
            <>
              <div className="technologies-actions-metal">{t("metal")} {technologies && technologies[currentTechnology].metal}</div>
              <div className="technologies-actions-energy">{t("energyCost")} {technologies && technologies[currentTechnology].energy}</div>
              {technologies && typeof(technologies[currentTechnology].antimatter) !== 'undefined' &&
                <div className="technologies-actions-antimatter">{t("antimatter")} {!technologies ? '' : technologies[currentTechnology].antimatter}</div>
              }
              {technologies && typeof(technologies[currentTechnology].money) !== 'undefined' &&
                <div className="technologies-actions-antimatter">{t("money")} {!technologies ? '' : technologies[currentTechnology].money}</div>
              }
              <div className="technologies-actions-time">{t("researchTime")} {technologies && msToDuration(technologies[currentTechnology].time)}</div>
              <div className="technologies-actions-end">{t("researchEnd")} {endOfResearch}</div>
              <button className="technologies-actions-button">{t("levelUp")}</button>
            </>
          }
          {showActions === 'showResearch' &&
            <>
              <div className="technologies-actions-time">{t("remainingTime")} {delay}</div>
              <div className="technologies-actions-end">{t("researchEnd")} {timestampToDate(updates[currentTechnology.split('-')[0]].time)}</div>
              {currentTechnology.match(/^update1/) &&
                <button className="technologies-actions-button">{t("stop")}</button>
              }
              {!currentTechnology.match(/^update1/) &&
                <button className="technologies-actions-button">{t("remove")}</button>
              }
            </>
          }
        </div>
      </div>
        
      <div className="technologies-researches-list">
        {updates &&
          <>
            <div className="technologies-researches-list-title">{t("list")}</div>
            <Item
              image={typeof(updates.update1) === 'undefined' ? Empty : cTable1[updates.update1.technology]}
              name={typeof(updates.update1) === 'undefined' ? '' : `update1-${updates.update1.technology}`}
              handleClick={typeof(updates.update1) !== 'undefined' && setCurrentTechnology}
            />
            <Item
              image={typeof(updates.update2) === 'undefined' ? Empty : cTable1[updates.update2.technology]}
              name={typeof(updates.update2) === 'undefined' ? '' : `update2-${updates.update2.technology}`}
              handleClick={typeof(updates.update2) !== 'undefined' && setCurrentTechnology}
            />
            <Item
              image={typeof(updates.update3) === 'undefined' ? Empty : cTable1[updates.update3.technology]}
              name={typeof(updates.update3) === 'undefined' ? '' : `update3-${updates.update3.technology}`}
              handleClick={typeof(updates.update3) !== 'undefined' && setCurrentTechnology}
            />
            <Item
              image={typeof(updates.update4) === 'undefined' ? Empty : cTable1[updates.update4.technology]}
              name={typeof(updates.update4) === 'undefined' ? '' : `update4-${updates.update4.technology}`}
              handleClick={typeof(updates.update4) !== 'undefined' && setCurrentTechnology}
            />
            <Item
              image={typeof(updates.update5) === 'undefined' ? Empty : cTable1[updates.update5.technology]}
              name={typeof(updates.update5) === 'undefined' ? '' : `update5-${updates.update5.technology}`}
              handleClick={typeof(updates.update5) !== 'undefined' && setCurrentTechnology}
            />
          </>
        }
      </div>

      <div className="technologies-menu-main-title"></div>

      <div className="technologies-menu">
        <div className="technologies-menu-title-elementary">{t("elementary")}</div>
        <div className="technologies-menu-categories technologies-menu-elementary">
          <Item image={Laser} name="laser" className="technologies-menu-item elementary" level={technologies && technologies.laser.level} handleClick={setCurrentTechnology} />
          <Item image={Fission} name="fission" className="technologies-menu-item elementary" level={technologies && technologies.fission.level} handleClick={setCurrentTechnology} />
          <Item image={Ballistic} name="ballistic" className="technologies-menu-item elementary" level={technologies && technologies.ballistic.level} handleClick={setCurrentTechnology} />
          <Item image={Frame1} name="frame1" className="technologies-menu-item elementary" level={technologies && technologies.frame1.level} handleClick={setCurrentTechnology} />
          <Item image={Propulsion} name="propulsion" className="technologies-menu-item elementary" level={technologies && technologies.propulsion.level} handleClick={setCurrentTechnology} />
          <Item image={Knowledge} name="knowledge" className="technologies-menu-item elementary" level={technologies && technologies.knowledge.level} handleClick={setCurrentTechnology} />
          <Item image={Ia} name="ia" className="technologies-menu-item elementary" level={technologies && technologies.ia.level} handleClick={setCurrentTechnology} />
          <Item image={Computer} name="computer" className="technologies-menu-item elementary" level={technologies && technologies.computer.level} handleClick={setCurrentTechnology} />
          <Item image={Geophysics} name="geophysics" className="technologies-menu-item elementary" level={technologies && technologies.geophysics.level} handleClick={setCurrentTechnology} />
          <Item image={Energy} name="energy" className="technologies-menu-item elementary" level={technologies && technologies.energy.level} handleClick={setCurrentTechnology} />
          <Item image={Security} name="security" className="technologies-menu-item elementary" level={technologies && technologies.security.level} handleClick={setCurrentTechnology} />
          <Item image={Nanotechnology} name="nanotechnology" className="technologies-menu-item elementary" level={technologies && technologies.nanotechnology.level} handleClick={setCurrentTechnology} />
          <Item image={Particle} name="particle" className="technologies-menu-item elementary" level={technologies && technologies.particle.level} handleClick={setCurrentTechnology} />
        </div>
        <div className="technologies-menu-title-advanced">{t("advanced")}</div>
        <div className="technologies-menu-categories technologies-menu-advanced">
          <Item image={Weapon} name="weapon" className="technologies-menu-item advanced" level={technologies && technologies.weapon.level} handleClick={setCurrentTechnology} />
          <Item image={Frame2} name="frame2" className="technologies-menu-item advanced" level={technologies && technologies.frame2.level} handleClick={setCurrentTechnology} />
          <Item image={Distortion} name="distortion" className="technologies-menu-item advanced" level={technologies && technologies.distortion.level} handleClick={setCurrentTechnology} />
          <Item image={Geospatial} name="geospatial" className="technologies-menu-item advanced" level={technologies && technologies.geospatial.level} handleClick={setCurrentTechnology} />
          <Item image={Neuronal} name="neuronal" className="technologies-menu-item advanced" level={technologies && technologies.neuronal.level} handleClick={setCurrentTechnology} />
          <Item image={Subatomic} name="subatomic" className="technologies-menu-item advanced" level={technologies && technologies.subatomic.level} handleClick={setCurrentTechnology} />
          <Item image={Transmutation} name="transmutation" className="technologies-menu-item advanced" level={technologies && technologies.transmutation.level} handleClick={setCurrentTechnology} />
          <Item image={Expansion} name="expansion" className="technologies-menu-item advanced" level={technologies && technologies.expansion.level} handleClick={setCurrentTechnology} />
          <Item image={Darkmatter} name="darkmatter" className="technologies-menu-item advanced" level={technologies && technologies.darkmatter.level} handleClick={setCurrentTechnology} />
        </div>
        <div className="technologies-menu-title-mothership">{t("mothership")}</div>
        <div className="technologies-menu-categories technologies-menu-mothership">
          <Item image={Core} name="core" className="technologies-menu-item mothership" level={technologies && technologies.core.level} handleClick={setCurrentTechnology} />
          <Item image={Module} name="module" className="technologies-menu-item mothership" level={technologies && technologies.module.level} handleClick={setCurrentTechnology} />
          <Item image={Repair} name="repair" className="technologies-menu-item mothership" level={technologies && technologies.repair.level} handleClick={setCurrentTechnology} />
          <Item image={Frame3} name="frame3" className="technologies-menu-item mothership" level={technologies && technologies.frame3.level} handleClick={setCurrentTechnology} />
        </div>
      </div>
    </>
  );
};

export default Technologies;
