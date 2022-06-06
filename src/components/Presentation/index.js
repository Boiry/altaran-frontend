import React, { useEffect, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { setPage } from 'src/utils/router';
import Civilizations from './Civilizations';

import './presentation.scss';

const Presentation = ({ goToCivilizationsGuide, goToCivilizationsGuideDone, selectCivilization }) => {
  // Translations
  const { t } = useTranslation('presentation');

  // Moving to the civilizations presentation
  const civilizationsAnchor = useRef();
  useEffect(() => {
    if (goToCivilizationsGuide) {
      const height = civilizationsAnchor.current.offsetTop;
      window.scrollTo({
        top: height,
        left: 0,
        behavior: "smooth",
      });
      goToCivilizationsGuideDone();
    }
  }, [goToCivilizationsGuide]);

  const handleSelection = (name) => {
    selectCivilization(name);
    setPage('register');
  }

  return (
    <article className="presentation-text">
      <Trans>{t('text1')}</Trans>
      <div ref={civilizationsAnchor}></div>
      <Civilizations selectCivilization={name => handleSelection(name)} />
      <Trans>{t('text2')}</Trans>
    </article>
  );
};


export default Presentation;
