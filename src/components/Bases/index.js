import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Tab from 'src/containers/Tab';

import './bases.scss';
import BaseSelector from 'src/containers/Bases/BaseSelector';
import Description from './Description';
import Facilities from 'src/containers/Bases/Facilities';
import Defenses from './Defenses';
import Ships from 'src/containers/Bases/Ships';
import Infantry from './Infantry';
import Technologies from 'src/containers/Bases/Technologies';
import Aside from 'src/containers/Bases/Aside';

const Bases = ({ selectedBase, changeSelectedBase }) => {
  const { t } = useTranslation('bases');
  const [subPage, changeSubPage] = useState("description");

  const tabs = {
    [t("description")]: "description",
    [t("facilities")]: "facilities",
    [t("defenses")]: "defenses",
    [t("ships")]: "ships",
    [t("infantry")]: "infantry",
    [t("technologies")]: "technologies"
  };


  useEffect(() => {
    // To prevent re-render of base selector, selected base is computed here
    const bases = document.getElementsByClassName("base-selector-base");
    for (let i=1; i<=bases.length; i++) {
      if (selectedBase === "base"+i) {
        bases[i-1].classList.add("selected-base");
        bases[i-1].style.width = "3.5rem";
      }
    }
  }, []);

  return (
    <>
      <div className="bases">

        <div className="base-selector">
          <BaseSelector handleClick={changeSelectedBase} />
        </div>

        <div className="bases-content">
          <Tab name={"bases"} tabs={tabs} dispatchSubPage={changeSubPage} />
          {subPage === 'description' && <Description />}
          {subPage === 'facilities' && <Facilities />}
          {subPage === 'defenses' && <Defenses />}
          {subPage === 'ships' && <Ships />}
          {subPage === 'infantry' && <Infantry />}
          {subPage === 'technologies' && <Technologies />}
        </div>
      </div>

      <Aside />

      <div className="soft-description">
        <p className="selector-base-name"></p>
        <p className="selector-base-coordinates"></p>
      </div>
    </>
  );
};

export default Bases;
