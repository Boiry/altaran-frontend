import React from 'react';
import { useTranslation } from 'react-i18next';

import './card.scss';

const Card = ({
  name,
  open,
  selectCivilization,
}) => {
  // Translations
  const { t } = useTranslation('presentation');

  // Associated image
  let image;
  switch (name) {
    case "Arinesse":
      image = require("../../../../assets/images/empires/arinesse.png").default;
      break;
    case "Zet-Ha":
      image = require("../../../../assets/images/empires/zet-ha.png").default;
      break;
    case "Xel-Nirr Ortolis":
      image = require("../../../../assets/images/empires/ortolis.png").default;
      break;
    case "Kha'Od":
      image = require("../../../../assets/images/empires/kha-od.png").default;
      break;
    case "Kertsakar":
      image = require("../../../../assets/images/empires/kertsakar.jpg").default;
      break;
    case "Xol To":
      image = require("../../../../assets/images/empires/xol-to.png").default;
      break;
  }

  return (
    <div className="presentation-civilizations-card" style={{backgroundImage: `url(${image})`}} onClick={() => open(name)}>
      <header className="presentation-civilizations-card-title">
        <h1 className="presentation-civilizations-card-civilization">{t('civilization')}</h1>
        <h2 className="presentation-civilizations-card-name">{name}</h2>
      </header>
      <p className="presentation-civilizations-card-summary">{t(`${name}.summary`)}</p>
      <footer onClick={() => selectCivilization(name)}>Choisir</footer>
    </div>
  );
};

export default Card;
