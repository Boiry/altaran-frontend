const namesTable = [
  "Laser",
  "Fission",
  "Arme ballistique",
  "Armature I",
  "Propulseur spatial",
  "Connaissance",
  "Intelligence artificielle",
  "Informatique",
  "Géophysique",
  "Energie",
  "Sécurité",
  "Nanotechnologie",
  "Particule chargée",
  "Armement prototype",
  "Armature II",
  "Propulsion par distorsion spatiale",
  "Géospatiale",
  "Télécommunication neuronale",
  "Subatomique",
  "Transmutation métallique",
  "Expansion stellaire",
  "Matière noire",
  "Noyau capital",
  "Module extrême",
  "Réparation",
  "Armature III"
];

export const init = () => {
  for (let i=0; i<namesTable.length; i++) {
    const item = document.getElementsByClassName("technologies-menu-item")[i];
    item.addEventListener("mouseover", () => {mouseOverItem("item"+i)});
    item.addEventListener("mouseout", () => {mouseOutItem()});
  }
};

const mouseOverItem = function(item) {
  for (let i=0; i<namesTable.length; i++) {
    if (item === "item"+i) {
      document.getElementsByClassName("technologies-menu-main-title")[0].textContent = namesTable[i];
      break;
    }
  }
};

const mouseOutItem = function(item) {
  document.getElementsByClassName("technologies-menu-main-title")[0].textContent = "";
};

