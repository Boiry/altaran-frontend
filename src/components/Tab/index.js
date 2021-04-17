import React, { useEffect, useState } from 'react';

const Tab = (props) => {
  const { name, tabs, page } = props;
  
  const [tabIndex, changetabIndex] = useState(0);
  const tabName = name + "-tab";
  
  let tabsArray = [];
  let linksArray = [];
  for (const tab in tabs) {
    tabsArray.push(tab);
    linksArray.push(tabs[tab]);
  };
  
  function handleClick(index) {
    page(linksArray[index]);
    changetabIndex(index);
  };

  const Divs = () => {
    const tabStyle = {
      background: "none",
      color: "white",
      fontFamily: "Orbitron, sans-serif",
      fontSize: ".9rem",
      flexGrow: "1",
      padding: ".5rem 0 1.5rem 0",
      cursor: "default",
      textAlign: "center",
      border: "1px solid transparent",
    };
    return (
      tabsArray.map((tabContent, index) => {
        const key = name + "-tab" + index;
        return (
          <button key={key} className={tabName} style={tabStyle} onClick={() => (handleClick(index))}>{tabContent}</button>
        )
      })
    )
  };

  const containerName = name + "-tab-container";
  const containerStyle = {
    height: "2rem",
    margin: "0 auto",
    display: "flex",
    paddingBottom: "2rem",
  };

  useEffect(() => {
    for (let i=0; i<tabsArray.length; i++) {
      const tab = document.getElementsByClassName(tabName)[i].style;
      if (i === tabIndex) {
        tab.border = "1px solid #5dbae0";
        tab.borderBottom = "1px solid transparent";
      } else {
        tab.borderBottom = "1px solid #5dbae0";
      }
    }
  });

  return (
    <div className={containerName} style={containerStyle}>
      <Divs />
    </div>
  );
};

export default Tab;
