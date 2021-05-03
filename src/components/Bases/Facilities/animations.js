const namesTable = [
  "Industrie minière",
  "Centrale géothermique",
  "Centrale à fusion",
  "Catalyseur énergétique de noyau",
  "Industrie d'alchimie",
  "Industrie atomique",
  "Extraction spatiale",
  "Centre financier",
  "Métropole",
  "Extraction de ressource de luxe",
  "Centre de renseignement",
  "Centre de développement",
  "Institut politique",
  "Monument",
  "Centre d'avancement technologique avancé",
  "Robotisation",
  "Serveur mère",
  "Centre spatial mécanique",
  "Institution de l'instruction",
  "Base militaire",
  "Centre de maintenance",
  "Concentrateur de matière noire",
  "Cité planétaire",
  "Stabilisateur du noyau",
  "Centre d'information sensible",
  "Distorsion temporrelle",
  "Revitalisateur"
];

export const init = () => {
  for (let i=0; i<namesTable.length; i++) {
    const item = document.getElementsByClassName("facilities-menu-item")[i];
    item.addEventListener("mouseover", () => {mouseOverItem("item"+i)});
    item.addEventListener("mouseout", () => {mouseOutItem()});
  }
};


const mouseOverItem = function(item) {
  for (let i=0; i<namesTable.length; i++) {
    if (item === "item"+i) {
      document.getElementsByClassName("facilities-menu-main-title")[0].textContent = namesTable[i];
      break;
    }
  }
};

const mouseOutItem = function(item) {
  document.getElementsByClassName("facilities-menu-main-title")[0].textContent = "";
};
