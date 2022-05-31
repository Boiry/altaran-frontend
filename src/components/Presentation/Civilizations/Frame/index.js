import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import './frame.scss';

const Frame = ({ name, update, updated }) => {
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
  // Open close frame
  const frame = useRef();
  const open = () => {
    frame.current.classList.add("presentation-civilizations-details-frame-opened");
  };

  const close = () => {
    frame.current.classList.remove("presentation-civilizations-details-frame-opened");

  };

  const currentlyDisplayed = useRef("");
  useEffect(() => {
    if (update) {
      updated();
      if (name !== "" && currentlyDisplayed.current === "") {
        currentlyDisplayed.current = name;
        open();
        return;
      }
      if (name !== "" && name === currentlyDisplayed.current) {
        currentlyDisplayed.current = "";
        close();
        return;
      }
      currentlyDisplayed.current = name;
    }
  }, [update]);

  return (
    <div ref={frame} className="presentation-civilizations-details-frame" style={{backgroundImage: `url(${image})`}}>
      <article className="presentation-civilizations-details-content">
        <h1>{name}</h1>
        <hr />
        <p className="presentation-civilizations-details-content-tags">{t(`${name}.tags`)}</p>
        <p className="presentation-civilizations-details-content-difficulty">
          {t('difficulty')} : {t(`${name}.difficulty`)}
        </p>
        <section className="presentation-civilizations-details-content-description">
          <div className="presentation-civilizations-details-content-facts">
            <h2>{t('facts')}</h2>
            <p><span>{t(`${name}.fact1.title`)}</span>{t(`${name}.fact1.fact`)}</p>
            <p><span>{t(`${name}.fact2.title`)}</span>{t(`${name}.fact2.fact`)} {t(`${name}.fact2.advanced`)}</p>
            <p><span>{t(`${name}.fact3.title`)}</span>{t(`${name}.fact3.fact`)} {t(`${name}.fact3.advanced`)}</p>
            <p><span>{t(`${name}.fact4.title`)}</span>{t(`${name}.fact4.fact`)} {t(`${name}.fact4.advanced`)}</p>
            <p><span>{t(`${name}.fact5.title`)}</span>{t(`${name}.fact5.fact`)} {t(`${name}.fact5.advanced`)}</p>
            <p><span>{t(`${name}.fact6.title`)}</span>{t(`${name}.fact6.fact`)} {t(`${name}.fact6.advanced`)}</p>
          </div>
          <div className="presentation-civilizations-details-content-technicals">
            <h2>{t('technicals')}</h2>
            {t(`${name}.technicals`).split('\n').map((part, index) => (<p key={`techs-part${index}`}>{part}</p>))}
          </div>
        </section>
        <div className="presentation-civilizations-details-content-history">
          <h2>{t('history')}</h2>
          {t(`${name}.history`).split('\n').map((part, index) => (<p key={`history-part${index}`}>{part}</p>))}
        </div>
      </article>
    </div>
  );
};

export default Frame;
