import React, { useEffect, useState } from 'react';

import Item from '../Item';
import { cTable1, cTable2 } from './correspondenceTable.js';

import { msToDuration, msToDate, countdown, timestampToDate } from 'src/utils/Timer';
import { init } from './animations.js';
import './facilities.scss';

import Empty from 'src/assets/images/icons/empty.svg';
import Mine from 'src/assets/images/icons/mine.svg';
import Geothermy from 'src/assets/images/icons/geothermy.svg';
import Fusion from 'src/assets/images/icons/fusion.svg';
import Catalyser from 'src/assets/images/icons/catalyser.svg';
import Storage from 'src/assets/images/icons/storage.svg';
import Alchemy from 'src/assets/images/icons/alchemy.svg';
import Atomic from 'src/assets/images/icons/atomic.svg';
import Darkmatter from 'src/assets/images/icons/darkmatter.svg';
import Financial from 'src/assets/images/icons/financial.svg';
import Metropolis from 'src/assets/images/icons/metropolis.svg';
import Luxury from 'src/assets/images/icons/luxury.svg';
import Robot from 'src/assets/images/icons/robot.svg';
import Server from 'src/assets/images/icons/server.svg';
import Mecanics from 'src/assets/images/icons/mecanics.svg';
import Instruction from 'src/assets/images/icons/instruction.svg';
import Military from 'src/assets/images/icons/military.svg';
import Maintenance from 'src/assets/images/icons/maintenance.svg';
import Concentrator from 'src/assets/images/icons/concentrator.svg';
import Intelligence from 'src/assets/images/icons/intelligence.svg';
import Development from 'src/assets/images/icons/development.svg';
import Politics from 'src/assets/images/icons/politics.svg';
import Monument from 'src/assets/images/icons/monument.svg';
import Technology from 'src/assets/images/icons/technology.svg';
import City from 'src/assets/images/icons/city.svg';
import Stabilizer from 'src/assets/images/icons/stabilizer.svg';
import Information from 'src/assets/images/icons/information.svg';
import Time from 'src/assets/images/icons/time.svg';
import Relifer from 'src/assets/images/icons/relifer.svg';

const Facilities = ({
  launchFetchFacilities,
  selectedBase,
  currentFacility,
  facilities,
  changeFacility,
  launchFetchFacilitiesUpdates,
  updates,
}) => {
  // Initialization
  useEffect(() => {
    if (!facilities) {
      launchFetchFacilities();
    }
    if (!currentFacility) {
      setCurrentFacility("mine");
      const currentItem = document.getElementsByClassName("item-mine")[0];
      currentItem.classList.add("item-is-active");
    }
    if (!updates) {
      launchFetchFacilitiesUpdates();
    }
  }, []);
  
  // Launch animations on hover icons
  useEffect(() => {
    if (document.getElementsByClassName('facilities-main').length !== 0) {
      init();
    }
  });

  // Handle click on icon
  const setCurrentFacility = (item) => {
    const name = `${selectedBase}CurrentFacility`;
    changeFacility(name, item);
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
  
  // For rendering of the end of construction
  const [endOfConstruction, setEndOfConstruction] = useState("");
  useEffect(() => {
    function setDate() {
      if (currentFacility && facilities) {
        let date;
        if (currentFacility.match(/^update/)) {
          let updateNumber = currentFacility.split('-');
          updateNumber = updateNumber[0];
          date = msToDate(updates[updateNumber].time);
        } else {
          date = msToDate(facilities[currentFacility].time);
        }
        setEndOfConstruction(date);
      }
    }
    setDate();
    const iterator = setInterval(setDate, 1000);
    return () => {
      clearInterval(iterator);
    };
  });

  // For rendering the countdown of the constructing facility
  const [delay, setDelay] = useState();
  useEffect(() => {
    function timer() {
      if (updates && currentFacility.match(/^update/)) {
        setDelay(countdown(updates[currentFacility.split('-')[0]].time));
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
  if (currentFacility) {
    const test = currentFacility.match(/^update/);
    test ? showActions = "showConstruction" : showActions = "showItem";
  }

  // Displaying the corresponding picture and title
  let displayedImage, title;
  if (currentFacility && facilities) {
    const test = currentFacility.match(/^update/);
    if (test) {
      const nameArray = currentFacility.split('-');
      displayedImage = cTable1[nameArray[1]];
      title = `${cTable2[nameArray[1]]} (prochain niveau : ${parseInt(facilities[nameArray[1]].level)+1})`;
    }
    else {
      displayedImage = cTable1[currentFacility];
      title = `${cTable2[currentFacility]} (niveau ${facilities[currentFacility].level})`;
    }
  }

  return (
    <>
      <div className="facilities-main">
        <img src={!currentFacility ? Empty : displayedImage} className="facilities-image" alt=""/>
        <div className="facilities-actions">
          <div className="facilities-actions-title">{!currentFacility ? '' : title}</div>
          {showActions === 'showItem' &&
            <>
              <div className="facilities-actions-metal">Métal nécessaire : {!facilities ? '' : facilities[currentFacility].metal}</div>
              <div className="facilities-actions-energy">Énergie nécessaire : {!facilities ? '' : facilities[currentFacility].energy}</div>
              <div className="facilities-actions-time">Temps de construction : {!facilities ? '' : msToDuration(facilities[currentFacility].time)}</div>
              <div className="facilities-actions-end">Fin de construction : {endOfConstruction}</div>
              <button className="facilities-actions-button">Améliorer</button>
              {facilities && facilities[currentFacility].level>0 &&
                <button className="facilities-actions-button">Démanteler</button>
              }
            </>
          }
          {showActions === 'showConstruction' &&
            <>
              <div className="facilities-actions-time">Temps restant : {delay}</div>
              <div className="facilities-actions-end">Fin de construction : {timestampToDate(updates[currentFacility.split('-')[0]].time)}</div>
              {currentFacility.match(/^update1/) &&
                <button className="facilities-actions-button">Arrêter la construction</button>
              }
              {!currentFacility.match(/^update1/) &&
                <button className="facilities-actions-button">Retirer de la liste</button>
              }
            </>
          }
          <div className="facilities-constructions-list">
            <div className="facilities-constructions-list-title">Liste de constructions</div>
            {updates &&
              <>
                <Item image={!updates.update1 ? Empty : cTable1[updates.update1.facility]} name={`update1-${updates.update1.facility}`} handleClick={setCurrentFacility} />
                <Item image={!updates.update2 ? Empty : cTable1[updates.update2.facility]} name={`update2-${updates.update2.facility}`} handleClick={setCurrentFacility} />
                <Item image={!updates.update3 ? Empty : cTable1[updates.update3.facility]} name={`update3-${updates.update3.facility}`} handleClick={setCurrentFacility} />
                <Item image={!updates.update4 ? Empty : cTable1[updates.update4.facility]} name={`update4-${updates.update4.facility}`} handleClick={setCurrentFacility} />
                <Item image={!updates.update5 ? Empty : cTable1[updates.update5.facility]} name={`update5-${updates.update5.facility}`} handleClick={setCurrentFacility} />
              </>
            }
          </div>
        </div>
      </div>

      <div className="facilities-menu">
        <div className="facilities-menu-title facilities-menu-production">Production</div>
        <Item image={Mine} name="mine" className="production" level={!facilities ? '' : facilities.mine.level} handleClick={setCurrentFacility} />
        <Item image={Geothermy} name="geothermy" className="production" level={!facilities ? '' : facilities.geothermy.level} handleClick={setCurrentFacility} />
        <Item image={Fusion} name="fusion" className="production" level={!facilities ? '' : facilities.fusion.level} handleClick={setCurrentFacility} />
        <Item image={Catalyser} name="catalyser" className="production" level={!facilities ? '' : facilities.catalyser.level} handleClick={setCurrentFacility} />
        <Item image={Storage} name="storage" className="production" level={!facilities ? '' : facilities.storage.level} handleClick={setCurrentFacility} />
        <Item image={Alchemy} name="alchemy" className="production" level={!facilities ? '' : facilities.alchemy.level} handleClick={setCurrentFacility} />
        <Item image={Atomic} name="atomic" className="production" level={!facilities ? '' : facilities.atomic.level} handleClick={setCurrentFacility} />
        <Item image={Darkmatter} name="darkmatter" className="production" level={!facilities ? '' : facilities.darkmatter.level} handleClick={setCurrentFacility} />
        <Item image={Financial} name="financial" className="production" level={!facilities ? '' : facilities.financial.level} handleClick={setCurrentFacility} />
        <Item image={Metropolis} name="metropolis" className="production" level={!facilities ? '' : facilities.metropolis.level} handleClick={setCurrentFacility} />
        <Item image={Luxury} name="luxury" className="production" level={!facilities ? '' : facilities.luxury.level} handleClick={setCurrentFacility} />
        <div className="facilities-menu-title facilities-menu-logistics">Logistique</div>
        <Item image={Robot} name="robot" className="logistics" level={!facilities ? '' : facilities.robot.level} handleClick={setCurrentFacility} />
        <Item image={Server} name="server" className="logistics" level={!facilities ? '' : facilities.server.level} handleClick={setCurrentFacility} />
        <Item image={Mecanics} name="mecanics" className="logistics" level={!facilities ? '' : facilities.mecanics.level} handleClick={setCurrentFacility} />
        <Item image={Instruction} name="instruction" className="logistics" level={!facilities ? '' : facilities.instruction.level} handleClick={setCurrentFacility} />
        <Item image={Military} name="military" className="logistics" level={!facilities ? '' : facilities.military.level} handleClick={setCurrentFacility} />
        <Item image={Maintenance} name="maintenance" className="logistics" level={!facilities ? '' : facilities.maintenance.level} handleClick={setCurrentFacility} />
        <Item image={Concentrator} name="concentrator" className="logistics" level={!facilities ? '' : facilities.concentrator.level} handleClick={setCurrentFacility} />
        <div className="facilities-menu-title facilities-menu-civilian">Civil</div>
        <Item image={Intelligence} name="intelligence" className="civilian" level={!facilities ? '' : facilities.intelligence.level} handleClick={setCurrentFacility} />
        <Item image={Development} name="development" className="civilian" level={!facilities ? '' : facilities.development.level} handleClick={setCurrentFacility} />
        <Item image={Politics} name="politics" className="civilian" level={!facilities ? '' : facilities.politics.level} handleClick={setCurrentFacility} />
        <Item image={Monument} name="monument" className="civilian" level={!facilities ? '' : facilities.monument.level} handleClick={setCurrentFacility} />
        <Item image={Technology} name="technology" className="civilian" level={!facilities ? '' : facilities.technology.level} handleClick={setCurrentFacility} />
        <div className="facilities-menu-title facilities-menu-advanced">Avancé</div>
        <Item image={City} name="city" className="advanced" level={!facilities ? '' : facilities.city.level} handleClick={setCurrentFacility} />
        <Item image={Stabilizer} name="stabilizer" className="advanced" level={!facilities ? '' : facilities.stabilizer.level} handleClick={setCurrentFacility} />
        <Item image={Information} name="information" className="advanced" level={!facilities ? '' : facilities.information.level} handleClick={setCurrentFacility} />
        <Item image={Time} name="time" className="advanced" level={!facilities ? '' : facilities.time.level} handleClick={setCurrentFacility} />
        <Item image={Relifer} name="relifer" className="advanced" level={!facilities ? '' : facilities.relifer.level} handleClick={setCurrentFacility} />
      </div>
    </>
  );
};

export default Facilities;
