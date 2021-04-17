import React, { useState } from 'react';

import Tab from 'src/components/Tab';

const Fleet = () => {
  const [subPage, changeSubPage] = useState("creation");

  const tabs = {
    "Création": "creation",
    "Flotte au sol et blablabla": "available",
    "Exemple": "exemple",
  };
  
  return (
    <>
      <Tab name={"fleet"} tabs={tabs} page={changeSubPage} />
      {subPage === "creation" && <div>Création</div>}
      {subPage === "available" && <div>Flotte au sol</div>}
    </>
  );
};

export default Fleet;
