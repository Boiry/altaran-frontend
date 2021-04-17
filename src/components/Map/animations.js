export const tab = (subPage) => {
  const pages = [
    "galaxy",
    "starSystem",
  ];
  for (let i=0; i<=1; i++) {
    const tab = document.getElementsByClassName("map-tab")[i];
    if (tab.className === "map-tab map-tab-active") {
      tab.className = "map-tab map-tab-inactive";
    }
    if (subPage === pages[i]) {
      document.getElementsByClassName("map-tab")[i].className = "map-tab map-tab-active";
    }
  };
};
