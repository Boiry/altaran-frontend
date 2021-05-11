import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  // Translations
  const { t } = useTranslation('facilities');

  // Initialization
  useEffect(() => {
    if (!facilities) {
      launchFetchFacilities();
    }
    if (!currentFacility) {
      setCurrentFacility("mine");
    }
    if (!updates) {
      launchFetchFacilitiesUpdates();
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
      const item = currentFacility;
      highlightIcon(item);
    }
  });

  // Handle click on icon
  const setCurrentFacility = (item) => {
    const name = `${selectedBase}CurrentFacility`;
    changeFacility(name, item);
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
      title = `${cTable2[nameArray[1]]} (${t("nextLevel")} ${parseInt(facilities[nameArray[1]].level)+1})`;
    }
    else {
      displayedImage = cTable1[currentFacility];
      title = `${cTable2[currentFacility]} (${t("level")} ${facilities[currentFacility].level})`;
    }
  }

  return (
    <>
      <div className="facilities-main">
        <img src={currentFacility && displayedImage} className="facilities-image" alt=""/>
        <div className="facilities-actions">
          <div className="facilities-actions-title">{!currentFacility ? '' : title}</div>
          {showActions === 'showItem' &&
            <>
              <div className="facilities-actions-metal">{t("metal")} {!facilities ? '' : facilities[currentFacility].metal}</div>
              <div className="facilities-actions-energy">{t("energy")} {!facilities ? '' : facilities[currentFacility].energy}</div>
              {facilities && typeof(facilities[currentFacility].antimatter) !== 'undefined' &&
                <div className="facilities-actions-antimatter">{t("antimatter")} {!facilities ? '' : facilities[currentFacility].antimatter}</div>
              }
              <div className="facilities-actions-time">{t("contructionTime")} {!facilities ? '' : msToDuration(facilities[currentFacility].time)}</div>
              <div className="facilities-actions-end">{t("constructionEnd")} {endOfConstruction}</div>
              <button className="facilities-actions-button">{t("levelUp")}</button>
              {facilities && facilities[currentFacility].level > 0 &&
                <button className="facilities-actions-button">{t("levelDown")}</button>
              }
            </>
          }
          {showActions === 'showConstruction' &&
            <>
              <div className="facilities-actions-time">{t("remainingTime")} {delay}</div>
              <div className="facilities-actions-end">{t("constructionEnd")} {timestampToDate(updates[currentFacility.split('-')[0]].time)}</div>
              {currentFacility.match(/^update1/) &&
                <button className="facilities-actions-button">{t("stop")}</button>
              }
              {!currentFacility.match(/^update1/) &&
                <button className="facilities-actions-button">{t("remove")}</button>
              }
            </>
          }
        </div>
      </div>

      <div className="facilities-constructions-list">
        {updates &&
          <>
            <div className="facilities-constructions-list-title">{t("list")}</div>
            <Item
              image={typeof(updates.update1) === 'undefined' ? Empty : cTable1[updates.update1.facility]}
              name={typeof(updates.update1) === 'undefined' ? '' : `update1-${updates.update1.facility}`}
              handleClick={typeof(updates.update1) !== 'undefined' && setCurrentFacility}
            />
            <Item
              image={typeof(updates.update2) === 'undefined' ? Empty : cTable1[updates.update2.facility]}
              name={typeof(updates.update2) === 'undefined' ? '' : `update2-${updates.update2.facility}`}
              handleClick={typeof(updates.update2) !== 'undefined' && setCurrentFacility}
            />
            <Item
              image={typeof(updates.update3) === 'undefined' ? Empty : cTable1[updates.update3.facility]}
              name={typeof(updates.update3) === 'undefined' ? '' : `update3-${updates.update3.facility}`}
              handleClick={typeof(updates.update3) !== 'undefined' && setCurrentFacility}
            />
            <Item
              image={typeof(updates.update4) === 'undefined' ? Empty : cTable1[updates.update4.facility]}
              name={typeof(updates.update4) === 'undefined' ? '' : `update4-${updates.update4.facility}`}
              handleClick={typeof(updates.update4) !== 'undefined' && setCurrentFacility}
            />
            <Item
              image={typeof(updates.update5) === 'undefined' ? Empty : cTable1[updates.update5.facility]}
              name={typeof(updates.update5) === 'undefined' ? '' : `update5-${updates.update5.facility}`}
              handleClick={typeof(updates.update5) !== 'undefined' && setCurrentFacility}
            />
          </>
        }
      </div>

      <div className="facilities-menu-main-title"></div>

      <div className="facilities-menu">
        <div className="facilities-menu-title-production">{t("production")}</div>
        <div className="facilities-menu-categories facilities-menu-production">
          <Item image={Mine} name="mine" className="facilities-menu-item production" level={!facilities ? '' : facilities.mine.level} handleClick={setCurrentFacility} />
          <Item image={Geothermy} name="geothermy" className="facilities-menu-item production" level={!facilities ? '' : facilities.geothermy.level} handleClick={setCurrentFacility} />
          <Item image={Fusion} name="fusion" className="facilities-menu-item production" level={!facilities ? '' : facilities.fusion.level} handleClick={setCurrentFacility} />
          <Item image={Catalyser} name="catalyser" className="facilities-menu-item production" level={!facilities ? '' : facilities.catalyser.level} handleClick={setCurrentFacility} />
          <Item image={Alchemy} name="alchemy" className="facilities-menu-item production" level={!facilities ? '' : facilities.alchemy.level} handleClick={setCurrentFacility} />
          <Item image={Atomic} name="atomic" className="facilities-menu-item production" level={!facilities ? '' : facilities.atomic.level} handleClick={setCurrentFacility} />
          <Item image={Darkmatter} name="darkmatter" className="facilities-menu-item production" level={!facilities ? '' : facilities.darkmatter.level} handleClick={setCurrentFacility} />
          <Item image={Financial} name="financial" className="facilities-menu-item production" level={!facilities ? '' : facilities.financial.level} handleClick={setCurrentFacility} />
          <Item image={Metropolis} name="metropolis" className="facilities-menu-item production" level={!facilities ? '' : facilities.metropolis.level} handleClick={setCurrentFacility} />
          <Item image={Luxury} name="luxury" className="facilities-menu-item production" level={!facilities ? '' : facilities.luxury.level} handleClick={setCurrentFacility} />
        </div>
        <div className="facilities-menu-title-civilian">{t("civilian")}</div>
        <div className="facilities-menu-categories facilities-menu-civilian">
          <Item image={Intelligence} name="intelligence" className="facilities-menu-item civilian" level={!facilities ? '' : facilities.intelligence.level} handleClick={setCurrentFacility} />
          <Item image={Development} name="development" className="facilities-menu-item civilian" level={!facilities ? '' : facilities.development.level} handleClick={setCurrentFacility} />
          <Item image={Politics} name="politics" className="facilities-menu-item civilian" level={!facilities ? '' : facilities.politics.level} handleClick={setCurrentFacility} />
          <Item image={Monument} name="monument" className="facilities-menu-item civilian" level={!facilities ? '' : facilities.monument.level} handleClick={setCurrentFacility} />
          <Item image={Technology} name="technology" className="facilities-menu-item civilian" level={!facilities ? '' : facilities.technology.level} handleClick={setCurrentFacility} />
        </div>
        <div className="facilities-menu-title-logistics">{t("logistics")}</div>
        <div className="facilities-menu-categories facilities-menu-logistics">
          <Item image={Robot} name="robot" className="facilities-menu-item logistics" level={!facilities ? '' : facilities.robot.level} handleClick={setCurrentFacility} />
          <Item image={Server} name="server" className="facilities-menu-item logistics" level={!facilities ? '' : facilities.server.level} handleClick={setCurrentFacility} />
          <Item image={Mecanics} name="mecanics" className="facilities-menu-item logistics" level={!facilities ? '' : facilities.mecanics.level} handleClick={setCurrentFacility} />
          <Item image={Instruction} name="instruction" className="facilities-menu-item logistics" level={!facilities ? '' : facilities.instruction.level} handleClick={setCurrentFacility} />
          <Item image={Military} name="military" className="facilities-menu-item logistics" level={!facilities ? '' : facilities.military.level} handleClick={setCurrentFacility} />
          <Item image={Maintenance} name="maintenance" className="facilities-menu-item logistics" level={!facilities ? '' : facilities.maintenance.level} handleClick={setCurrentFacility} />
          <Item image={Concentrator} name="concentrator" className="facilities-menu-item logistics" level={!facilities ? '' : facilities.concentrator.level} handleClick={setCurrentFacility} />
        </div>
        <div className="facilities-menu-title-advanced">{t("advanced")}</div>
        <div className="facilities-menu-categories facilities-menu-advanced">
          <Item image={City} name="city" className="facilities-menu-item advanced" level={!facilities ? '' : facilities.city.level} handleClick={setCurrentFacility} />
          <Item image={Stabilizer} name="stabilizer" className="facilities-menu-item advanced" level={!facilities ? '' : facilities.stabilizer.level} handleClick={setCurrentFacility} />
          <Item image={Information} name="information" className="facilities-menu-item advanced" level={!facilities ? '' : facilities.information.level} handleClick={setCurrentFacility} />
          <Item image={Time} name="time" className="facilities-menu-item advanced" level={!facilities ? '' : facilities.time.level} handleClick={setCurrentFacility} />
          <Item image={Relifer} name="relifer" className="facilities-menu-item advanced" level={!facilities ? '' : facilities.relifer.level} handleClick={setCurrentFacility} />
        </div>
      </div>
    </>
  );
};

export default Facilities;
