export const init = () => {
  for (let i=0; i<=10; i++) {
    const item = document.getElementsByClassName("production")[i];
    item.addEventListener("mouseover", () => {mouseOverItem("itemProduction"+i)});
    item.addEventListener("mouseout", () => {mouseOutItem("itemProduction")});
  };
  for (let i=0; i<=6; i++) {
    const item = document.getElementsByClassName("logistics")[i];
    item.addEventListener("mouseover", () => {mouseOverItem("itemLogistics"+i)});
    item.addEventListener("mouseout", () => {mouseOutItem("itemLogistics")});
  };
  for (let i=0; i<=4; i++) {
    const item = document.getElementsByClassName("civilian")[i];
    item.addEventListener("mouseover", () => {mouseOverItem("itemCivilian"+i)});
    item.addEventListener("mouseout", () => {mouseOutItem("itemCivilian")});
  };
  for (let i=0; i<=4; i++) {
    const item = document.getElementsByClassName("advanced")[i];
    item.addEventListener("mouseover", () => {mouseOverItem("itemAdvanced"+i)});
    item.addEventListener("mouseout", () => {mouseOutItem("itemAdvanced")});
  };
};

const mouseOverItem = function(item) {
  const production = [
    "Industrie minière",
    "Centrale géothermique",
    "Centrale à fusion",
    "Catalyseur énergétique de noyau",
    "Industrie de stockage d'énergie",
    "Industrie d'alchimie",
    "Industrie atomique",
    "Extraction spatiale",
    "Centre financier",
    "Métropole",
    "Extraction de ressource de luxe"
  ];

  const logistics = [
    "Robotisation",
    "Serveur mère",
    "Centre spatial mécanique",
    "Institution de l'instruction",
    "Base militaire",
    "Centre de maintenance",
    "Concentrateur de matière noire"
  ];

  const civilian = [
    "Centre de renseignement",
    "Centre de développement",
    "Institut politique",
    "Monument",
    "Centre d'avancement technologique avancé",
  ];

  const advanced = [
    "Cité planétaire",
    "Stabilisateur du noyau",
    "Centre d'information sensible",
    "Distorsion temporrelle",
    "Revitalisateur"
  ];

  for (let i=0; i<production.length; i++) {
    if (item === "itemProduction"+i) {
      document.getElementsByClassName("facilities-menu-production")[0].innerHTML = "Production - " + production[i];
      break;
    }
    if (item === "itemLogistics"+i) {
      document.getElementsByClassName("facilities-menu-logistics")[0].innerHTML = "Logistique - " + logistics[i];
      break;
    }
    if (item === "itemCivilian"+i) {
      document.getElementsByClassName("facilities-menu-civilian")[0].innerHTML = "Civil - " + civilian[i];
      break;
    }
    if (item === "itemAdvanced"+i) {
      document.getElementsByClassName("facilities-menu-advanced")[0].innerHTML = "Avancé - " + advanced[i];
      break;
    }
  }
};

const mouseOutItem = function(item) {
  switch (item) {
    case "itemProduction":
      document.getElementsByClassName("facilities-menu-production")[0].innerHTML = "Production";
      break;
    case "itemLogistics":
      document.getElementsByClassName("facilities-menu-logistics")[0].innerHTML = "Logistique";
      break;
    case "itemCivilian":
      document.getElementsByClassName("facilities-menu-civilian")[0].innerHTML = "Civil";
      break;
    case "itemAdvanced":
      document.getElementsByClassName("facilities-menu-advanced")[0].innerHTML = "Avancé";
      break;
  }
}
