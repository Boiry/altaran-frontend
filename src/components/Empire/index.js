import React, { useState } from 'react';

import Background from 'src/assets/images/background3.jpg';

import Tab from 'src/containers/Tab';

import './empire.scss';

const Empire = () => {
  document.body.style.background = `url(${Background})`;

  const [subPage, changeSubPage] = useState('statistics');
  const tabs = {
    "Statistiques": "statistics",
    "Classement": "ranking",
  };
  
  return (
    <div className="container">
      <Tab name={"empire"} tabs={tabs} dispatchSubPage={changeSubPage} />
      {subPage === "statistics" && <div>Statistiques</div>}
      {subPage === "ranking" && <div>Classement</div>}

    </div>
  );
};

export default Empire;
