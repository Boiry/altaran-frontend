export const planetSelector = () => {
  for (let i=1; i<=25; i++) {
    const planet = document.getElementsByClassName("planet-selector-planet")[i-1];
    planet.addEventListener("mouseover", () => {mouseOverPlanet(i)});
    planet.addEventListener("mouseout", () => {mouseOutPlanet(i)});
    planet.addEventListener("click", () => {clickOnPlanet(i-1)});
  };
};

const mouseOverPlanet = (planet) => {
  const overedElement = document.getElementsByClassName("planet-selector-planet")[planet-1];
  overedElement.style.width = "3.5rem";
  const top = overedElement.clientHeight + overedElement.offsetTop + 50;
  const left = overedElement.offsetParent.offsetLeft + 60;
  const softDescription = document.getElementsByClassName("soft-description")[0];
  softDescription.style.top = top+"px";
  softDescription.style.left = left+"px";
  softDescription.style.display = "flow-root";
  for (let i=1; i<=25; i++) {
    if (planet === i) {
      softDescription.querySelector(".selector-planet-name").innerHTML = "Planète " + i;
    }
  }
  const previousElement = overedElement.previousElementSibling;
  if (previousElement !== null && previousElement.className === "planet-selector-planet") {
    previousElement.style.width = "2.5rem";
  }
  const nextElement = overedElement.nextElementSibling;
  if (nextElement !== null && nextElement.className === "planet-selector-planet") {
    nextElement.style.width = "2.5rem";
  }
};

const mouseOutPlanet = (planet) => {
  const outedElement = document.getElementsByClassName("planet-selector-planet")[planet-1];
  if (outedElement.className !== "planet-selector-planet selected-planet") {
    outedElement.style.width = "1.5rem";
  }
  document.getElementsByClassName("soft-description")[0].style.display = "none";
  const previousElement = outedElement.previousElementSibling;
  if (previousElement !== null && previousElement.className === "planet-selector-planet") {
    previousElement.style.width = "1.5rem";
  }
  const nextElement = outedElement.nextElementSibling;
  if (nextElement !== null && nextElement.className === "planet-selector-planet") {
    nextElement.style.width = "1.5rem";
  }
};

const clickOnPlanet = (planet) => {
  if (document.getElementsByClassName("selected-planet").length) {
    const previousSelectedPlanet = document.getElementsByClassName("selected-planet");
    previousSelectedPlanet[0].style.width = "1.5rem";
    previousSelectedPlanet[0].className = "planet-selector-planet";
  };
  const selectedPlanet = document.getElementsByClassName("planet-selector-planet")[planet];
  selectedPlanet.className = "planet-selector-planet selected-planet";
  selectedPlanet.style.width = "3.5rem";
};

export const tab = (subPage) => {
  const pages = [
    "description",
    "facilities",
    "defenses",
    "fleet",
    "infantry",
    "technology",
  ];
  for (let i=0; i<=5; i++) {
    const tab = document.getElementsByClassName("colonies-tab")[i];
    if (tab.className === "colonies-tab colonies-tab-active") {
      tab.className = "colonies-tab colonies-tab-inactive";
    }
    if (subPage === pages[i]) {
      document.getElementsByClassName("colonies-tab")[i].className = "colonies-tab colonies-tab-active";
    }
  };
};
