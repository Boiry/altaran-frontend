import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import Arrow from 'src/assets/images/arrow-specialties.svg';
import './specialties.scss';

const Specialties = () => {
  // Translations
  const { t } = useTranslation('specialties');

  const footerShort = useRef();
  const footerLong = useRef();
  const footerButton = useRef();

  const handleClick = (text) => {
    footerShort.current.style.visibility = "visible";
    footerButton.current.style.visibility = "visible";
    footerShort.current.textContent = t(`short.${text}`);
    footerLong.current.textContent = t(`long.${text}`);
  }

  useEffect(() => {
    footerShort.current.style.visibility = "hidden";
    footerButton.current.style.visibility = "hidden";
  }, []);

  return (
    <div className="specialties">
      <div className="specialties-main">
        <table className="specialties-table">
          <thead>
            <tr>
              <th></th>
              <th>{t("military")}</th>
              <th>{t("trading")}</th>
              <th>{t("technology")}</th>
              <th>{t("spying")}</th>
              <th>{t("exploration")}</th>
              <th>{t("seclusion")}</th>
              <th>{t("invasion")}</th>
            </tr>

            <tr>
              <th></th>
              <th><img src={Arrow} className="specialties-arrow" /></th>
              <th><img src={Arrow} className="specialties-arrow" /></th>
              <th><img src={Arrow} className="specialties-arrow" /></th>
              <th><img src={Arrow} className="specialties-arrow" /></th>
              <th><img src={Arrow} className="specialties-arrow" /></th>
              <th><img src={Arrow} className="specialties-arrow" /></th>
              <th><img src={Arrow} className="specialties-arrow" /></th>
            </tr>

          </thead>
          <tbody>
            <tr className="specialties-level1">
              <th rowSpan="3" className="specialties-level">{t("level")} 1</th>

              <td onClick={() => handleClick("military1")}>{t("short.military1")}</td>
              <td onClick={() => handleClick("trading1")}>{t("short.trading1")}</td>
              <td onClick={() => handleClick("technology1")}>{t("short.technology1")}</td>
              <td onClick={() => handleClick("spying1")}>{t("short.spying1")}</td>
              <td onClick={() => handleClick("exploration1")}>{t("short.exploration1")}</td>
              <td onClick={() => handleClick("seclusion1")}>{t("short.seclusion1")}</td>
              <td onClick={() => handleClick("invasion1")}>{t("short.invasion1")}</td>
            </tr>

            <tr className="specialties-level1">
              <td onClick={() => handleClick("military2")}>{t("short.military2")}</td>
              <td onClick={() => handleClick("trading2")}>{t("short.trading2")}</td>
              <td onClick={() => handleClick("technology2")}>{t("short.technology2")}</td>
              <td onClick={() => handleClick("spying2")}>{t("short.spying2")}</td>
              <td onClick={() => handleClick("exploration2")}>{t("short.exploration2")}</td>
              <td onClick={() => handleClick("seclusion2")}>{t("short.seclusion2")}</td>
              <td onClick={() => handleClick("invasion2")}>{t("short.invasion2")}</td>
            </tr>

            <tr className="specialties-level1">
            <td onClick={() => handleClick("military3")}>{t("short.military3")}</td>
              <td onClick={() => handleClick("trading3")}>{t("short.trading3")}</td>
              <td onClick={() => handleClick("technology3")}>{t("short.technology3")}</td>
              <td onClick={() => handleClick("spying3")}>{t("short.spying3")}</td>
              <td onClick={() => handleClick("exploration3")}>{t("short.exploration3")}</td>
              <td onClick={() => handleClick("seclusion3")}>{t("short.seclusion3")}</td>
              <td onClick={() => handleClick("invasion3")}>{t("short.invasion3")}</td>
            </tr>

            <tr className="specialties-level2">
              <th rowSpan="3">{t("level")} 2</th>

              <td onClick={() => handleClick("military4")}>{t("short.military4")}</td>
              <td onClick={() => handleClick("trading4")}>{t("short.trading4")}</td>
              <td onClick={() => handleClick("technology4")}>{t("short.technology4")}</td>
              <td onClick={() => handleClick("spying4")}>{t("short.spying4")}</td>
              <td onClick={() => handleClick("exploration4")}>{t("short.exploration4")}</td>
              <td onClick={() => handleClick("seclusion4")}>{t("short.seclusion4")}</td>
              <td onClick={() => handleClick("invasion4")}>{t("short.invasion4")}</td>
            </tr>

            <tr className="specialties-level2">
            <td onClick={() => handleClick("military5")}>{t("short.military5")}</td>
              <td onClick={() => handleClick("trading5")}>{t("short.trading5")}</td>
              <td onClick={() => handleClick("technology5")}>{t("short.technology5")}</td>
              <td onClick={() => handleClick("spying5")}>{t("short.spying5")}</td>
              <td onClick={() => handleClick("exploration5")}>{t("short.exploration5")}</td>
              <td onClick={() => handleClick("seclusion5")}>{t("short.seclusion5")}</td>
              <td onClick={() => handleClick("invasion5")}>{t("short.invasion5")}</td>
            </tr>

            <tr className="specialties-level2">
            <td onClick={() => handleClick("military6")}>{t("short.military6")}</td>
              <td onClick={() => handleClick("trading6")}>{t("short.trading6")}</td>
              <td onClick={() => handleClick("technology6")}>{t("short.technology6")}</td>
              <td onClick={() => handleClick("spying6")}>{t("short.spying6")}</td>
              <td onClick={() => handleClick("exploration6")}>{t("short.exploration6")}</td>
              <td onClick={() => handleClick("seclusion6")}>{t("short.seclusion6")}</td>
              <td onClick={() => handleClick("invasion6")}>{t("short.invasion6")}</td>
            </tr>

            <tr className="specialties-level3">
              <th rowSpan="3">{t("level")} 3</th>

              <td onClick={() => handleClick("military7")}>{t("short.military7")}</td>
              <td onClick={() => handleClick("trading7")}>{t("short.trading7")}</td>
              <td onClick={() => handleClick("technology7")}>{t("short.technology7")}</td>
              <td onClick={() => handleClick("spying7")}>{t("short.spying7")}</td>
              <td onClick={() => handleClick("exploration7")}>{t("short.exploration7")}</td>
              <td onClick={() => handleClick("seclusion7")}>{t("short.seclusion7")}</td>
              <td onClick={() => handleClick("invasion7")}>{t("short.invasion7")}</td>
            </tr>

            <tr className="specialties-level3">
            <td onClick={() => handleClick("military8")}>{t("short.military8")}</td>
              <td onClick={() => handleClick("trading8")}>{t("short.trading8")}</td>
              <td onClick={() => handleClick("technology8")}>{t("short.technology8")}</td>
              <td onClick={() => handleClick("spying8")}>{t("short.spying8")}</td>
              <td onClick={() => handleClick("exploration8")}>{t("short.exploration8")}</td>
              <td onClick={() => handleClick("seclusion8")}>{t("short.seclusion8")}</td>
              <td onClick={() => handleClick("invasion8")}>{t("short.invasion8")}</td>
            </tr>

            <tr className="specialties-level3">
            <td onClick={() => handleClick("military9")}>{t("short.military9")}</td>
              <td onClick={() => handleClick("trading9")}>{t("short.trading9")}</td>
              <td onClick={() => handleClick("technology9")}>{t("short.technology9")}</td>
              <td onClick={() => handleClick("spying9")}>{t("short.spying9")}</td>
              <td onClick={() => handleClick("exploration9")}>{t("short.exploration9")}</td>
              <td onClick={() => handleClick("seclusion9")}>{t("short.seclusio9")}</td>
              <td onClick={() => handleClick("invasion9")}>{t("short.invasion9")}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="specialties-footer">
        <div ref={footerShort} className="specialties-footer-short"></div>
        <div ref={footerLong} className="specialties-footer-long"></div>
        <button ref={footerButton} className="specialties-footer-button">{t("select")}</button>
      </div>

    </div>
  );
};

export default Specialties;
