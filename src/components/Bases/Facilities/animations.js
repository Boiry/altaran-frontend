import i18next from 'i18next';

const namesTable = [
  i18next.t('facilities:mine'),
  i18next.t('facilities:geothermy'),
  i18next.t('facilities:fusion'),
  i18next.t('facilities:catalyser'),
  i18next.t('facilities:steel'),
  i18next.t('facilities:atomic'),
  i18next.t('facilities:collector'),
  i18next.t('facilities:financial'),
  i18next.t('facilities:metropolis'),
  i18next.t('facilities:luxury'),
  i18next.t('facilities:intelligence'),
  i18next.t('facilities:concentrator'),
  i18next.t('facilities:development'),
  i18next.t('facilities:politics'),
  i18next.t('facilities:monument'),
  i18next.t('facilities:robot'),
  i18next.t('facilities:server'),
  i18next.t('facilities:shipyard'),
  i18next.t('facilities:instruction'),
  i18next.t('facilities:military'),
  i18next.t('facilities:maintenance'),
  i18next.t('facilities:stabilizer'),
  i18next.t('facilities:information'),
  i18next.t('facilities:orbital'),
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
