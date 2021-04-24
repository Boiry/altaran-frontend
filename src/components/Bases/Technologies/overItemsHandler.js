export const init = () => {
  for (let i=0; i<13; i++) {
    const item = document.getElementsByClassName("technologies-elementary")[i];
    item.addEventListener("mouseover", () => {mouseOverItem("itemElementary"+i)});
    item.addEventListener("mouseout", () => {mouseOutItem("itemElementary")});
  };
  for (let i=0; i<9; i++) {
    const item = document.getElementsByClassName("technologies-advanced")[i];
    item.addEventListener("mouseover", () => {mouseOverItem("itemAdvanced"+i)});
    item.addEventListener("mouseout", () => {mouseOutItem("itemAdvanced")});
  };
  for (let i=0; i<4; i++) {
    const item = document.getElementsByClassName("technologies-mothership")[i];
    item.addEventListener("mouseover", () => {mouseOverItem("itemMothership"+i)});
    item.addEventListener("mouseout", () => {mouseOutItem("itemMothership")});
  };
};

const elementary = [
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
  "Particule chargée"
];

const advanced = [
  "Armement prototype",
  "Armature II",
  "Propulsion par distorsion spatiale",
  "Géospatiale",
  "Télécommunication neuronale",
  "Subatomique",
  "Transmutation métallique",
  "Expansion stellaire",
  "Matière noire"
];

const mothership = [
  "Noyau capital",
  "Module extrême",
  "Réparation",
  "Armature III"
];

const mouseOverItem = (item) => {
  for (let i=0; i<elementary.length; i++) {
    if (item === "itemElementary"+i) {
      document.getElementsByClassName("technologies-menu-elementary")[0].textContent = "Technologies élémentaires - " + elementary[i];
      break;
    }
    if (item === "itemAdvanced"+i) {
      document.getElementsByClassName("technologies-menu-advanced")[0].textContent = "Technologies avancées - " + advanced[i];
      break;
    }
    if (item === "itemMothership"+i) {
      document.getElementsByClassName("technologies-menu-mothership")[0].textContent = "Technologies de vaisseau mère - " + mothership[i];
      break;
    }
  }
};

const mouseOutItem = (item) => {
  switch (item) {
    case "itemElementary":
      document.getElementsByClassName("technologies-menu-elementary")[0].textContent = "Technologies élémentaires";
      break;
    case "itemAdvanced":
      document.getElementsByClassName("technologies-menu-advanced")[0].textContent = "Technologies avancées";
      break;
    case "itemMothership":
      document.getElementsByClassName("technologies-menu-mothership")[0].textContent = "Technologies de vaisseau mère";
      break;
  }
}
