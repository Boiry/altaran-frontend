import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

import './overview.scss';

const Overview = ({ changePage }) => {
  const { t } = useTranslation('politics');
  const regimes = {
    democracy: [t("democracy.name"), t("democracy.summary"), "democracy.bonus1", "democracy.bonus2", "democracy.bonus3"],
    imperialism: [t("imperialism.name"), t("imperialism.summary"), "imperialism.bonus1", "imperialism.bonus2", "imperialism.bonus3"],
    nationalism: [t("nationalism.name"), t("nationalism.summary"), "nationalism.bonus1", "nationalism.bonus2", "nationalism.bonus3"],
    oligarchy: [t("oligarchy.name"), t("oligarchy.summary"), "oligarchy.bonus1", "oligarchy.bonus2", "oligarchy.bonus3"],
    monarchy: [t("monarchy.name"), t("monarchy.summary"), "monarchy.bonus1", "monarchy.bonus2", "monarchy.bonus3"],
    technocracy: [t("technocracy.name"), t("technocracy.summary"), "technocracy.bonus1", "technocracy.bonus2", "technocracy.bonus3"],
    communism: [t("communism.name"), t("communism.summary"), "communism.bonus1", "communism.bonus2", "communism.bonus3"],
    authoritarianism: [t("authoritarianism.name"), t("authoritarianism.summary"), "authoritarianism.bonus1", "authoritarianism.bonus2", "authoritarianism.bonus3"],
    republic: [t("republic.name"), t("republic.summary"), "republic.bonus1", "republic.bonus2", "republic.bonus3"],
    obscurantism: [t("obscurantism.name"), t("obscurantism.summary"), "obscurantism.bonus1", "obscurantism.bonus2", "obscurantism.bonus3"],
    theocracy: [t("theocracy.name"), t("theocracy.summary"), "theocracy.bonus1", "theocracy.bonus2", "theocracy.bonus3"],
    transcendentism: [t("transcendentism.name"), t("transcendentism.summary"), "transcendentism.bonus1", "transcendentism.bonus2", "transcendentism.bonus3"],
  }
  return (
    <div className="politics-overview-container">
      {Object.keys(regimes).map((regime, index) => (
        <div key={`regime${index}`} className="politics-overview-ideology" onClick={() => changePage(regime)}>
          <div className="politics-overview-name">{regimes[regime][0]}</div>
          <div className="politics-overview-description">
            {regimes[regime][1]}
            <div className="politics-overview-bonuses">
              <div className="politics-overview-bonuses-title">{t("bonus-title")}</div>
              <Trans t={t} i18nKey={regimes[regime][2]}>
                <p className="politics-overview-bonus">Administration changes every: <strong>days</strong>.</p>
              </Trans>
              <Trans t={t} i18nKey={regimes[regime][3]}>
                <p className="politics-overview-bonus">Happiness progress: <strong>happiness</strong>.</p>
              </Trans>
              <Trans t={t} i18nKey={regimes[regime][4]}>
                <p className="politics-overview-bonus">Efficiency: <strong>efficiency</strong>.</p>
              </Trans>
            </div>
          </div>
        </div>
      ))}


    </div>
  )
}

export default Overview;
