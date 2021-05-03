import React, { useState } from 'react';

import Tab from 'src/containers/Tab';
import Specialties from 'src/components/Administration/Specialties';
import Politics from 'src/components/Administration/Politics';

import './administration.scss';

const Administration = () => {
  const [subPage, changeSubPage] = useState("specialties");

  const tabs = {
    "Spécialités": "specialties",
    "Politique": "politics",
  };

  return (
    <>
      <div className="administration">
        <Tab name={"administration"} tabs={tabs} dispatchSubPage={changeSubPage} />
        {subPage === "specialties" && <Specialties />}
        {subPage === "politics" && <Politics />}

      </div>
    </>
  );
};

export default Administration;
