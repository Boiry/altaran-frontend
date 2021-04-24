import React, { useEffect } from 'react';

import './tab.scss';

const Tab = ({ stateTabs, newSubPage, name, tabs, dispatchSubPage }) => {
  // Extracting tab names (tabsArray) and matching state values (linksArray)
  let tabsArray = [];
  let linksArray = [];
  for (const tab in tabs) {
    tabsArray.push(tab);
    linksArray.push(tabs[tab]);
  };

  // Loop to create buttons
  const Tabs = () => (
    tabsArray.map((tabTitle, index) => {
      const key = `${name}-tab${index}`;
      const tabClass = linksArray[index] === stateTabs[name] ? "tab tab-active" : "tab tab-inactive";
      return (
        <button key={key} className={tabClass} onClick={() => (handleClick(index))}>{tabTitle}</button>
      );
    })
  );

  // Dispatch the new subPage to the store via the container
  const handleClick = (index) => {
    newSubPage(name, linksArray[index]);
  };
  
  // Dispatch new tab clicked to the parent component
  useEffect(() => {
    for (let i=0; i<linksArray.length; i++) {
      if (linksArray[i] === stateTabs[name]) {
        dispatchSubPage(linksArray[i]);
      };
    };
  });

  return (
   <div className="tab-container">
     <Tabs />
   </div>
  );
};

export default Tab;
