import React from 'react';
import { useTranslation } from 'react-i18next';

import './selected.scss';

import Corner from 'src/assets/images/corner.svg'; 
import Political1 from 'src/assets/images/political1.svg';
import Political2 from 'src/assets/images/political2.svg';
import Political3 from 'src/assets/images/political3.svg';


const Selected = ({ chosenPolitics, regime, changePage }) => {
  const { t } = useTranslation('politics');

  let politics;
  regime ? politics = regime : politics = chosenPolitics;

  return (
    <>
      <div className="politics-selected-container">
        <div className="politics-selected-left-panel">
          <div className="politics-selected-title">{t(`${politics}.name`)}</div>
          <div className="politics-selected-description">{t(`${politics}.description`)}</div>
          <div className="politics-selected-bonus">{t(`${politics}.bonus`)}</div>
        </div>

        <div className="politics-selected-right-panel">
          <div className="politics-selected-political1">
            <div className="politics-selected-political1-presentation">
              <img className="politics-selected-political-picture" src={Political1} />
              <div className="politics-selected-political1-attributes">C'est quelqu'un de bien, si si ! D'ailleurs il a été élu avec 99% des voix c'est pour dire !</div>
            </div>
            <div className="politics-selected-political1-change">Ici pour changer le haut fonctionnaire qui est quand-même un escroc notoire.</div>
          </div>
          <div className="politics-selected-politicals">
            <div className="politics-selected-politicals-presentation">
              <img className="politics-selected-politicals-picture" src={Political2} />
              <img className="politics-selected-politicals-picture" src={Political3} />
              <div className="politics-selected-politicals-attributes">
                <div className="politics-selected-politicals-attributes-detail">Le premier larbin est sympa mais incompétent.</div>
                <div className="politics-selected-politicals-attributes-detail">Le deuxième n'est ni l'un ni l'autre.</div>
              </div>
            </div>
            <div className="politics-selected-politicals-change">Ici pour changer les deux larbins. Franchement c'est mieux.</div>
          </div>
          <div className="politics-selected-explainations">Ici différentes explications techniques sur le menu et la mécanique. Parait-il qu'il y aura même des astuces.</div>
        </div>
      </div>

      <aside className="politics-selected-aside">
        <img src={Corner} className="corner corner-top-left" />
        <img src={Corner} className="corner corner-top-right" />
        <img src={Corner} className="corner corner-bottom-left" />
        <img src={Corner} className="corner corner-bottom-right" />
        <button className="politics-selected-aside-button">{t("select")}</button>
        <button className="politics-selected-aside-button" onClick={() => changePage()}>{t("see-all")}</button>
      </aside>
    </>
  )
}

export default Selected;
