import React, { useEffect, useState } from 'react';

import Item from '../Item';
import { cTable1, cTable2 } from './correspondenceTable.js';
import { msToDuration, msToDate, countdown, timestampToDate } from 'src/utils/Timer';

import { init } from './overItemsHandler.js';
import './technologies.scss';

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
  }, []);

  // Launch animations on hover icons
  useEffect(() => {
    init();
  });

  // Handle click on icon
  const setCurrentTechnology = (item) => {
    const name = `${selectedBase}CurrentTechnology`;
    changeTechnology(name, item);
    // Highlighting the icon
    if (updates) {
      const itemIcon = document.getElementsByClassName("item-icon");
      const size = Object.keys(cTable1).length + 5;
      for (let i=0; i<size; i++) {
        itemIcon[i].classList.remove("item-is-active")
      }
      const currentItem = document.getElementsByClassName(`item-${item}`)[0];
      currentItem.classList.add("item-is-active");
    }
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
      title = `${cTable2[nameArray[1]]} (prochain niveau : ${parseInt(technologies[nameArray[1]].level)+1})`;
    }
    else {
      displayedImage = cTable1[currentTechnology];
      title = `${cTable2[currentTechnology]} (niveau ${technologies[currentTechnology].level})`;
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
              <div className="technologies-actions-metal">Métal nécessaire : {technologies && technologies[currentTechnology].metal}</div>
              <div className="technologies-actions-energy">Énergie nécessaire : {technologies && technologies[currentTechnology].energy}</div>
              <div className="technologies-actions-time">Temps de recherche : {technologies && msToDuration(technologies[currentTechnology].time)}</div>
              <div className="technologies-actions-end">Fin de la recherche : {endOfResearch}</div>
              <button className="technologies-actions-button">Augmenter d'un niveau</button>
            </>
          }
          {showActions === 'showResearch' &&
            <>
              <div className="technologies-actions-time">Temps restant : {delay}</div>
              <div className="technologies-actions-end">Fin de la recherche : {timestampToDate(updates[currentTechnology.split('-')[0]].time)}</div>
              {currentTechnology.match(/^update1/) &&
                <button className="technologies-actions-button">Arrêter la recherche</button>
              }
              {!currentTechnology.match(/^update1/) &&
                <button className="technologies-actions-button">Retirer de la liste</button>
              }
            </>
          }
          <div className="technologies-researches-list">
            <div className="technologies-researches-list-title">Liste de constructions</div>
            {updates &&
              <>
                <Item image={updates && cTable1[updates.update1.technology]} name={`update1-${updates.update1.technology}`} handleClick={setCurrentTechnology} />
                <Item image={updates && cTable1[updates.update2.technology]} name={`update2-${updates.update2.technology}`} handleClick={setCurrentTechnology} />
                <Item image={updates && cTable1[updates.update3.technology]} name={`update3-${updates.update3.technology}`} handleClick={setCurrentTechnology} />
                <Item image={updates && cTable1[updates.update4.technology]} name={`update4-${updates.update4.technology}`} handleClick={setCurrentTechnology} />
                <Item image={updates && cTable1[updates.update5.technology]} name={`update5-${updates.update5.technology}`} handleClick={setCurrentTechnology} />
              </>
            }
          </div>
        </div>
      </div>

      <div className="technologies-menu">
        <div className="technologies-menu-title technologies-menu-elementary">Technologies élémentaires</div>
        <Item image={Laser} name="laser" className="elementary" level={technologies && technologies.laser.level} handleClick={setCurrentTechnology} />
        <Item image={Fission} name="fission" className="elementary" level={technologies && technologies.fission.level} handleClick={setCurrentTechnology} />
        <Item image={Ballistic} name="ballistic" className="elementary" level={technologies && technologies.ballistic.level} handleClick={setCurrentTechnology} />
        <Item image={Frame1} name="frame1" className="elementary" level={technologies && technologies.frame1.level} handleClick={setCurrentTechnology} />
        <Item image={Propulsion} name="propulsion" className="elementary" level={technologies && technologies.propulsion.level} handleClick={setCurrentTechnology} />
        <Item image={Knowledge} name="knowledge" className="elementary" level={technologies && technologies.knowledge.level} handleClick={setCurrentTechnology} />
        <Item image={Ia} name="ia" className="elementary" level={technologies && technologies.ia.level} handleClick={setCurrentTechnology} />
        <Item image={Computer} name="computer" className="elementary" level={technologies && technologies.computer.level} handleClick={setCurrentTechnology} />
        <Item image={Geophysics} name="geophysics" className="elementary" level={technologies && technologies.geophysics.level} handleClick={setCurrentTechnology} />
        <Item image={Energy} name="energy" className="elementary" level={technologies && technologies.energy.level} handleClick={setCurrentTechnology} />
        <Item image={Security} name="security" className="elementary" level={technologies && technologies.security.level} handleClick={setCurrentTechnology} />
        <Item image={Nanotechnology} name="nanotechnology" className="elementary" level={technologies && technologies.nanotechnology.level} handleClick={setCurrentTechnology} />
        <Item image={Particle} name="particle" className="elementary" level={technologies && technologies.particle.level} handleClick={setCurrentTechnology} />
        <div className="technologies-menu-title technologies-menu-advanced">Technologies avancées</div>
        <Item image={Weapon} name="weapon" className="advanced" level={technologies && technologies.weapon.level} handleClick={setCurrentTechnology} />
        <Item image={Frame2} name="frame2" className="advanced" level={technologies && technologies.frame2.level} handleClick={setCurrentTechnology} />
        <Item image={Distortion} name="distortion" className="advanced" level={technologies && technologies.distortion.level} handleClick={setCurrentTechnology} />
        <Item image={Geospatial} name="geospatial" className="advanced" level={technologies && technologies.geospatial.level} handleClick={setCurrentTechnology} />
        <Item image={Neuronal} name="neuronal" className="advanced" level={technologies && technologies.neuronal.level} handleClick={setCurrentTechnology} />
        <Item image={Subatomic} name="subatomic" className="advanced" level={technologies && technologies.subatomic.level} handleClick={setCurrentTechnology} />
        <Item image={Transmutation} name="transmutation" className="advanced" level={technologies && technologies.transmutation.level} handleClick={setCurrentTechnology} />
        <Item image={Expansion} name="expansion" className="advanced" level={technologies && technologies.expansion.level} handleClick={setCurrentTechnology} />
        <Item image={Darkmatter} name="darkmatter" className="advanced" level={technologies && technologies.darkmatter.level} handleClick={setCurrentTechnology} />
        <div className="technologies-menu-title technologies-menu-mothership">Technologies de vaisseau mère</div>
        <Item image={Core} name="core" className="mothership" level={technologies && technologies.core.level} handleClick={setCurrentTechnology} />
        <Item image={Module} name="module" className="mothership" level={technologies && technologies.module.level} handleClick={setCurrentTechnology} />
        <Item image={Repair} name="repair" className="mothership" level={technologies && technologies.repair.level} handleClick={setCurrentTechnology} />
        <Item image={Frame3} name="frame3" className="mothership" level={technologies && technologies.frame3.level} handleClick={setCurrentTechnology} />
      </div>
    </>
  );
};

export default Technologies;
