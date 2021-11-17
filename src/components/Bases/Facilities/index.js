import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import Item from '../Item';
import { msToDuration, msToDate, countdown, timestampToDate } from 'src/utils/Timer';

import './facilities.scss';

import Empty from 'src/assets/images/icons/empty.svg';
import Mine from 'src/assets/images/icons/mine.svg';
import Geothermy from 'src/assets/images/icons/geothermy.svg';
import Fusion from 'src/assets/images/icons/fusion.svg';
import Catalyser from 'src/assets/images/icons/catalyser.svg';
import Steel from 'src/assets/images/icons/steel.svg';
import Atomic from 'src/assets/images/icons/atomic.svg';
import Collector from 'src/assets/images/icons/collector.svg';
import Financial from 'src/assets/images/icons/financial.svg';
import Metropolis from 'src/assets/images/icons/metropolis.svg';
import Luxury from 'src/assets/images/icons/luxury.svg';
import Robot from 'src/assets/images/icons/robot.svg';
import Server from 'src/assets/images/icons/server.svg';
import Shipyard from 'src/assets/images/icons/shipyard.svg';
import Instruction from 'src/assets/images/icons/instruction.svg';
import Military from 'src/assets/images/icons/military.svg';
import Maintenance from 'src/assets/images/icons/maintenance.svg';
import Concentrator from 'src/assets/images/icons/concentrator.svg';
import Intelligence from 'src/assets/images/icons/intelligence.svg';
import Development from 'src/assets/images/icons/development.svg';
import Politics from 'src/assets/images/icons/politics.svg';
import Monument from 'src/assets/images/icons/monument.svg';
import Orbital from 'src/assets/images/icons/orbital.svg';
import Stabilizer from 'src/assets/images/icons/stabilizer.svg';
import Information from 'src/assets/images/icons/information.svg';

const Facilities = ({
  selectedBase,
  baseId,
  fetchFacilitiesLevels,
  facilitiesLevels,
  fetchCurrentFacility,
  currentFacility,
  nextLevelCost,
  fetchFacilitiesUpgrades,
  upgrades,
  addFacilityUpgrade,
  removeFacilityUpgrade,
  changeFacility,
}) => {
  // Translations
  const { t } = useTranslation('facilities');

  // Initialization
  useEffect(() => {
    if (!facilitiesLevels) {
      fetchFacilitiesLevels();
    }
    if (!currentFacility) {
      setCurrentFacility("MINING_INDUSTRY");
    }
    if (!upgrades) {
      fetchFacilitiesUpgrades(baseId);
    }
  }, [selectedBase]);

  // For rendering of the end of construction
  const [endOfConstruction, setEndOfConstruction] = useState("");
  useEffect(() => {
    function setDate() {
      if (currentFacility && nextLevelCost) {
        let date = msToDate(nextLevelCost.constructionTime);
        setEndOfConstruction(date);
      }
    }
    setDate();
    const iterator = setInterval(setDate, 1000);
    return () => {
      clearInterval(iterator);
    };
  });

  // Handle click on icon
  const setCurrentFacility = (facility) => {
    if (!facility.match(/^upgrade/)) {
      fetchCurrentFacility(selectedBase, baseId, facility);
    }
    changeFacility(selectedBase, facility);
  };

  // Toggle for rendering item from menu or from update list
  let showActions;
  if (currentFacility) {
    const isUpgrade = currentFacility.match(/^upgrade/);
    isUpgrade ? showActions = "showConstruction" : showActions = "showItem";
  }

  // Correspondance table between names and images
  const nameToImage = {
    MINING_INDUSTRY: Mine,
    GEOTHERMAL_POWER_PLANT: Geothermy,
    FUSION_POWER_PLANT: Fusion,
    CORE_CATALYST: Catalyser,
    STEEL_COMPLEX: Steel,
    PARTICLE_ACCELERATOR: Atomic,
    DARKMATTER_COLLECTOR: Collector,
    FINANCIAL_CENTER: Financial,
    MEGALOPOLIS: Metropolis,
    RARE_RESOURCE_EXTRACTOR: Luxury,
    ROBOTISATION: Robot,
    CENTRAL_SERVER: Server,
    ORBITAL_SITE: Shipyard,
    UNIVERSITY: Instruction,
    GARRISON: Military,
    REPAIR_CENTER: Maintenance,
    DARK_MATTER_CONCENTRATOR: Concentrator,
    INTELLIGENCE_AGENCY: Intelligence,
    DEVELOPMENT_INSTITUTE: Development,
    POLITICAL_INSTITUTION: Politics,
    MONUMENT: Monument,
    CORE_STABILIZER: Stabilizer,
    ZONE_52: Information,
    ORBITAL_CITY: Orbital,
  };

  // Displaying the corresponding picture and title
  const displayedImage = useRef();
  const titleDiv = useRef();
  if (currentFacility && facilitiesLevels && displayedImage.current) {
    if (currentFacility.match(/^upgrade/)) {
      const name = currentFacility.split('-');
      displayedImage.current.src = nameToImage[name[1]];
      titleDiv.current.textContent = `${t(name[1])}`;
    } else {
      displayedImage.current.src = nameToImage[currentFacility];
      titleDiv.current.textContent = `${t(currentFacility)} (${t("level")} ${facilitiesLevels[currentFacility]})`;
    }
  }
  if (!currentFacility && displayedImage.current) {
    displayedImage.current.src = '';
    titleDiv.current.textContent = '';
  }

  // Show name on hover facility
  const nameDiv = useRef();
  const showName = (name) => {
    nameDiv.current.textContent = t(name);
  }

  // Format great numbers
  const formatize = (number) => {
    return new Intl.NumberFormat('fr-FR').format(number);
  }

  // Level up a facility / adding to queue
  const levelUp = () => {
    addFacilityUpgrade(baseId, currentFacility);
  }

  // Remove upgrade from queue
  const removeUpgrade = (facility) => {
    const upgrade = facility.charAt(7);
    const upgradeId = upgrades[upgrade-1].id;
    removeFacilityUpgrade(baseId, upgradeId);
    changeFacility(selectedBase, null);
  }

  return (
    <>
      <div className="facilities-main">
        <img ref={displayedImage} src="" className="facilities-image" alt=""/>
        <div className="facilities-actions">
          <div ref={titleDiv} className="facilities-actions-title"></div>
          {showActions === 'showItem' &&
            <>
              {nextLevelCost && nextLevelCost.costMetal != 0 &&
                <div className="facilities-actions-metal">{t("metal")} {formatize(nextLevelCost.costMetal)}</div>
              }
              {nextLevelCost && nextLevelCost.costEnergy != 0 &&
                <div className="facilities-actions-energy">{t("energy")} {formatize(nextLevelCost.costEnergy)}</div>
              }
              {nextLevelCost && nextLevelCost.costAntimatter != 0 &&
                <div className="facilities-actions-antimatter">{t("antimatter")} {formatize(nextLevelCost.costAntimatter)}</div>
              }
              {nextLevelCost && nextLevelCost.workforce != 0 &&
                <div className="facilities-actions-workforce">{t("workforce")} {formatize(nextLevelCost.workforce)}</div>
              }
              {nextLevelCost && nextLevelCost.energyConsumption != 0 &&
                <div className="facilities-actions-energyConsumption">{t("energyConsumption")} {formatize(nextLevelCost.energyConsumption)}</div>
              }
              {nextLevelCost &&
                <div className="facilities-actions-time">{t("contructionTime")} {msToDuration(nextLevelCost.constructionTime)}</div>
              }
              {nextLevelCost &&
                <div className="facilities-actions-end">{t("constructionEnd")} {endOfConstruction}</div>
              }
              <button className="facilities-actions-button" onClick={levelUp}>{t("levelUp")}</button>
              {currentFacility && facilitiesLevels && facilitiesLevels[currentFacility] > 0 &&
                <button className="facilities-actions-button">{t("levelDown")}</button>
              }
              
            </>
          }
          {showActions === 'showConstruction' &&
            <>
              {currentFacility.match(/^upgrade1/) &&
                <button className="facilities-actions-button" onClick={() => removeUpgrade(currentFacility)}>{t("stop")}</button>
              }
              {!currentFacility.match(/^upgrade1/) &&
                <button className="facilities-actions-button" onClick={() => removeUpgrade(currentFacility)}>{t("remove")}</button>
              }
            </>
          }
        </div>
      </div>

      <div className="facilities-constructions-list">
        {upgrades &&
          <>
            <div className="facilities-constructions-list-title">{t("list")}</div>
            <Item
              image={!upgrades[0] ? Empty : nameToImage[upgrades[0].name]}
              name={!upgrades[0] ? '' : `upgrade1-${upgrades[0].name}`}
              current={upgrades[0] && currentFacility === `upgrade1-${upgrades[0].name}`}
              handleClick={upgrades[0] && setCurrentFacility}
            />
            <Item
              image={!upgrades[1] ? Empty : nameToImage[upgrades[1].name]}
              name={!upgrades[1] ? '' : `upgrade2-${upgrades[1].name}`}
              current={upgrades[1] && currentFacility === `upgrade2-${upgrades[1].name}`}
              handleClick={upgrades[1] && setCurrentFacility}
            />
            <Item
              image={!upgrades[2] ? Empty : nameToImage[upgrades[2].name]}
              name={!upgrades[2] ? '' : `upgrade3-${upgrades[2].name}`}
              current={upgrades[2] && currentFacility === `upgrade3-${upgrades[2].name}`}
              handleClick={upgrades[2] && setCurrentFacility}
            />
            <Item
              image={!upgrades[3] ? Empty : nameToImage[upgrades[3].name]}
              name={!upgrades[3] ? '' : `upgrade4-${upgrades[3].name}`}
              current={upgrades[3] && currentFacility === `upgrade4-${upgrades[3].name}`}
              handleClick={upgrades[3] && setCurrentFacility}
            />
            <Item
              image={!upgrades[4] ? Empty : nameToImage[upgrades[4].name]}
              name={!upgrades[4] ? '' : `upgrade5-${upgrades[4].name}`}
              current={upgrades[4] && currentFacility === `upgrade5-${upgrades[4].name}`}
              handleClick={upgrades[4] && setCurrentFacility}
            />
          </>
        }
      </div>

      <div ref={nameDiv} className="facilities-menu-main-title"></div>

      <div className="facilities-menu">
        <div className="facilities-menu-title-production">{t("production")}</div>
        <div className="facilities-menu-categories facilities-menu-production">
          <Item
            image={Mine}
            name="MINING_INDUSTRY"
            className="facilities-menu-item production"
            level={!facilitiesLevels ? '' : facilitiesLevels.MINING_INDUSTRY}
            current={currentFacility === "MINING_INDUSTRY" && true}
            handleClick={setCurrentFacility}
            handleHover={showName}
            handleOut={showName}
          />
          <Item
            image={Geothermy}
            name="GEOTHERMAL_POWER_PLANT"
            className="facilities-menu-item production"
            level={!facilitiesLevels ? '' : facilitiesLevels.GEOTHERMAL_POWER_PLANT}
            current={currentFacility === "GEOTHERMAL_POWER_PLANT" && true}
            handleClick={setCurrentFacility}
            handleHover={showName}
            handleOut={showName}
          />
          <Item
            image={Fusion}
            name="FUSION_POWER_PLANT"
            className="facilities-menu-item production"
            level={!facilitiesLevels ? '' : facilitiesLevels.FUSION_POWER_PLANT}
            current={currentFacility === "FUSION_POWER_PLANT" && true}
            handleClick={setCurrentFacility}
            handleHover={showName}
            handleOut={showName}
          />
          <Item
            image={Catalyser}
            name="CORE_CATALYST"
            className="facilities-menu-item production"
            level={!facilitiesLevels ? '' : facilitiesLevels.CORE_CATALYST}
            current={currentFacility === "CORE_CATALYST" && true}
            handleClick={setCurrentFacility}
            handleHover={showName}
            handleOut={showName}
          />
          <Item
            image={Steel}
            name="STEEL_COMPLEX"
            className="facilities-menu-item production"
            level={!facilitiesLevels ? '' : facilitiesLevels.STEEL_COMPLEX}
            current={currentFacility === "STEEL_COMPLEX" && true}
            handleClick={setCurrentFacility}
            handleHover={showName}
            handleOut={showName}
          />
          <Item
            image={Atomic}
            name="PARTICLE_ACCELERATOR"
            className="facilities-menu-item production"
            level={!facilitiesLevels ? '' : facilitiesLevels.PARTICLE_ACCELERATOR}
            current={currentFacility === "PARTICLE_ACCELERATOR" && true}
            handleClick={setCurrentFacility}
            handleHover={showName}
            handleOut={showName}
          />
          <Item
            image={Collector}
            name="DARKMATTER_COLLECTOR"
            className="facilities-menu-item production"
            level={!facilitiesLevels ? '' : facilitiesLevels.DARKMATTER_COLLECTOR}
            current={currentFacility === "DARKMATTER_COLLECTOR" && true}
            handleClick={setCurrentFacility}
            handleHover={showName}
            handleOut={showName}
          />
          <Item
            image={Financial}
            name="FINANCIAL_CENTER"
            className="facilities-menu-item production"
            level={!facilitiesLevels ? '' : facilitiesLevels.FINANCIAL_CENTER}
            current={currentFacility === "FINANCIAL_CENTER" && true}
            handleClick={setCurrentFacility}
            handleHover={showName}
            handleOut={showName}
          />
          <Item
            image={Metropolis}
            name="MEGALOPOLIS"
            className="facilities-menu-item production"
            level={!facilitiesLevels ? '' : facilitiesLevels.MEGALOPOLIS}
            current={currentFacility === "MEGALOPOLIS" && true}
            handleClick={setCurrentFacility}
            handleHover={showName}
            handleOut={showName}
          />
          <Item
            image={Luxury}
            name="RARE_RESOURCE_EXTRACTOR"
            className="facilities-menu-item production"
            level={!facilitiesLevels ? '' : facilitiesLevels.RARE_RESOURCE_EXTRACTOR}
            current={currentFacility === "RARE_RESOURCE_EXTRACTOR" && true}
            handleClick={setCurrentFacility}
            handleHover={showName}
            handleOut={showName}
          />
        </div>
        <div className="facilities-menu-title-civilian">{t("civilian")}</div>
        <div className="facilities-menu-categories facilities-menu-civilian">
          <Item
            image={Intelligence}
            name="INTELLIGENCE_AGENCY"
            className="facilities-menu-item civilian"
            level={!facilitiesLevels ? '' : facilitiesLevels.INTELLIGENCE_AGENCY}
            current={currentFacility === "INTELLIGENCE_AGENCY" && true}
            handleClick={setCurrentFacility}
            handleHover={showName}
            handleOut={showName}
          />
          <Item
            image={Concentrator}
            name="DARK_MATTER_CONCENTRATOR"
            className="facilities-menu-item functional"
            level={!facilitiesLevels ? '' : facilitiesLevels.DARK_MATTER_CONCENTRATOR}
            current={currentFacility === "DARK_MATTER_CONCENTRATOR" && true}
            handleClick={setCurrentFacility}
            handleHover={showName}
            handleOut={showName}
          />
          <Item
            image={Development}
            name="DEVELOPMENT_INSTITUTE"
            className="facilities-menu-item civilian"
            level={!facilitiesLevels ? '' : facilitiesLevels.DEVELOPMENT_INSTITUTE}
            current={currentFacility === "DEVELOPMENT_INSTITUTE" && true}
            handleClick={setCurrentFacility}
            handleHover={showName}
            handleOut={showName}
          />
          <Item
            image={Politics}
            name="POLITICAL_INSTITUTION"
            className="facilities-menu-item civilian"
            level={!facilitiesLevels ? '' : facilitiesLevels.POLITICAL_INSTITUTION}
            current={currentFacility === "POLITICAL_INSTITUTION" && true}
            handleClick={setCurrentFacility}
            handleHover={showName}
            handleOut={showName}
          />
          <Item
            image={Monument}
            name="MONUMENT"
            className="facilities-menu-item civilian"
            level={!facilitiesLevels ? '' : facilitiesLevels.MONUMENT}
            current={currentFacility === "MONUMENT" && true}
            handleClick={setCurrentFacility}
            handleHover={showName}
            handleOut={showName}
          />
        </div>
        <div className="facilities-menu-title-functional">{t("functional")}</div>
        <div className="facilities-menu-categories facilities-menu-functional">
          <Item
            image={Robot}
            name="ROBOTISATION"
            className="facilities-menu-item functional"
            level={!facilitiesLevels ? '' : facilitiesLevels.ROBOTISATION}
            current={currentFacility === "ROBOTISATION" && true}
            handleClick={setCurrentFacility}
            handleHover={showName}
            handleOut={showName}
          />
          <Item
            image={Server}
            name="CENTRAL_SERVER"
            className="facilities-menu-item functional"
            level={!facilitiesLevels ? '' : facilitiesLevels.CENTRAL_SERVER}
            current={currentFacility === "CENTRAL_SERVER" && true}
            handleClick={setCurrentFacility}
            handleHover={showName}
            handleOut={showName}
          />
          <Item
            image={Shipyard}
            name="ORBITAL_SITE"
            className="facilities-menu-item functional"
            level={!facilitiesLevels ? '' : facilitiesLevels.ORBITAL_SITE}
            current={currentFacility === "ORBITAL_SITE" && true}
            handleClick={setCurrentFacility}
            handleHover={showName}
            handleOut={showName}
          />
          <Item
            image={Instruction}
            name="UNIVERSITY"
            className="facilities-menu-item functional"
            level={!facilitiesLevels ? '' : facilitiesLevels.UNIVERSITY}
            current={currentFacility === "UNIVERSITY" && true}
            handleClick={setCurrentFacility}
            handleHover={showName}
            handleOut={showName}
          />
          <Item
            image={Military}
            name="GARRISON"
            className="facilities-menu-item functional"
            level={!facilitiesLevels ? '' : facilitiesLevels.GARRISON}
            current={currentFacility === "GARRISON" && true}
            handleClick={setCurrentFacility}
            handleHover={showName}
            handleOut={showName}
          />
          <Item
            image={Maintenance}
            name="REPAIR_CENTER"
            className="facilities-menu-item functional"
            level={!facilitiesLevels ? '' : facilitiesLevels.REPAIR_CENTER}
            current={currentFacility === "REPAIR_CENTER" && true}
            handleClick={setCurrentFacility}
            handleHover={showName}
            handleOut={showName}
          />
        </div>
        <div className="facilities-menu-title-advanced">{t("advanced")}</div>
        <div className="facilities-menu-categories facilities-menu-advanced">
          <Item
            image={Stabilizer}
            name="CORE_STABILIZER"
            className="facilities-menu-item advanced"
            level={!facilitiesLevels ? '' : facilitiesLevels.CORE_STABILIZER}
            current={currentFacility === "CORE_STABILIZER" && true}
            handleClick={setCurrentFacility}
            handleHover={showName}
            handleOut={showName}
          />
          <Item
            image={Information}
            name="ZONE_52"
            className="facilities-menu-item advanced"
            level={!facilitiesLevels ? '' : facilitiesLevels.ZONE_52}
            current={currentFacility === "ZONE_52" && true}
            handleClick={setCurrentFacility}
            handleHover={showName}
            handleOut={showName}
          />
          <Item
            image={Orbital}
            name="ORBITAL_CITY"
            className="facilities-menu-item advanced"
            level={!facilitiesLevels ? '' : facilitiesLevels.ORBITAL_CITY}
            current={currentFacility === "ORBITAL_CITY" && true}
            handleClick={setCurrentFacility}
            handleHover={showName}
            handleOut={showName}
          />
        </div>
      </div>
    </>
  );
};

export default Facilities;
