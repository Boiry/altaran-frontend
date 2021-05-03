import React, { useEffect, useRef } from 'react';

import { short, long } from './text.js';
import './specialties.scss';

const Specialties = () => {
  const footerShort = useRef();
  const footerLong = useRef();
  const footerButton = useRef();

  const handleClick = (category, level) => {
    footerShort.current.style.visibility = "visible";
    footerButton.current.style.visibility = "visible";
    footerShort.current.textContent = short[category][level];
    footerLong.current.textContent = long[category][level];
  }

  useEffect(() => {
    footerShort.current.style.visibility = "hidden";
    footerButton.current.style.visibility = "hidden";
  }, []);


  return (
    <div className="specialties">
      <div className="specialties-main">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Militaire</th>
              <th>Commerce</th>
              <th>Technologie</th>
              <th>Espionnage</th>
              <th>Exploration</th>
              <th>Séclusion</th>
              <th>Invasion</th>
            </tr>

          </thead>
          <tbody>
            <tr className="specialties-level1">
              <th rowSpan="3" className="specialties-level">Palier 1</th>

              <td onClick={() => handleClick("military", 0)}>{short.military[0]}</td>
              <td onClick={() => handleClick("trading", 0)}>{short.trading[0]}</td>
              <td onClick={() => handleClick("technology", 0)}>{short.technology[0]}</td>
              <td onClick={() => handleClick("spying", 0)}>{short.spying[0]}</td>
              <td onClick={() => handleClick("exploration", 0)}>{short.exploration[0]}</td>
              <td onClick={() => handleClick("seclusion", 0)}>{short.seclusion[0]}</td>
              <td onClick={() => handleClick("invasion", 0)}>{short.invasion[0]}</td>
            </tr>

            <tr className="specialties-level1">
              <td onClick={() => handleClick("military", 1)}>{short.military[1]}</td>
              <td onClick={() => handleClick("trading", 1)}>{short.trading[1]}</td>
              <td onClick={() => handleClick("technology", 1)}>{short.technology[1]}</td>
              <td onClick={() => handleClick("spying", 1)}>{short.spying[1]}</td>
              <td onClick={() => handleClick("exploration", 1)}>{short.exploration[1]}</td>
              <td onClick={() => handleClick("seclusion", 1)}>{short.seclusion[1]}</td>
              <td onClick={() => handleClick("invasion", 1)}>{short.invasion[1]}</td>
            </tr>

            <tr className="specialties-level1">
            <td onClick={() => handleClick("military", 2)}>{short.military[2]}</td>
              <td onClick={() => handleClick("trading", 2)}>{short.trading[2]}</td>
              <td onClick={() => handleClick("technology", 2)}>{short.technology[2]}</td>
              <td onClick={() => handleClick("spying", 2)}>{short.spying[2]}</td>
              <td onClick={() => handleClick("exploration", 2)}>{short.exploration[2]}</td>
              <td onClick={() => handleClick("seclusion", 2)}>{short.seclusion[2]}</td>
              <td onClick={() => handleClick("invasion", 2)}>{short.invasion[2]}</td>
            </tr>

            <tr className="specialties-level2">
              <th rowSpan="3">Palier 2</th>

              <td onClick={() => handleClick("military", 3)}>{short.military[3]}</td>
              <td onClick={() => handleClick("trading", 3)}>{short.trading[3]}</td>
              <td onClick={() => handleClick("technology", 3)}>{short.technology[3]}</td>
              <td onClick={() => handleClick("spying", 3)}>{short.spying[3]}</td>
              <td onClick={() => handleClick("exploration", 3)}>{short.exploration[3]}</td>
              <td onClick={() => handleClick("seclusion", 3)}>{short.seclusion[3]}</td>
              <td onClick={() => handleClick("invasion", 3)}>{short.invasion[3]}</td>
            </tr>

            <tr className="specialties-level2">
            <td onClick={() => handleClick("military", 4)}>{short.military[4]}</td>
              <td onClick={() => handleClick("trading", 4)}>{short.trading[4]}</td>
              <td onClick={() => handleClick("technology", 4)}>{short.technology[4]}</td>
              <td onClick={() => handleClick("spying", 4)}>{short.spying[4]}</td>
              <td onClick={() => handleClick("exploration", 4)}>{short.exploration[4]}</td>
              <td onClick={() => handleClick("seclusion", 4)}>{short.seclusion[4]}</td>
              <td onClick={() => handleClick("invasion", 4)}>{short.invasion[4]}</td>
            </tr>

            <tr className="specialties-level2">
            <td onClick={() => handleClick("military", 5)}>{short.military[5]}</td>
              <td onClick={() => handleClick("trading", 5)}>{short.trading[5]}</td>
              <td onClick={() => handleClick("technology", 5)}>{short.technology[5]}</td>
              <td onClick={() => handleClick("spying", 5)}>{short.spying[5]}</td>
              <td onClick={() => handleClick("exploration", 5)}>{short.exploration[5]}</td>
              <td onClick={() => handleClick("seclusion", 5)}>{short.seclusion[5]}</td>
              <td onClick={() => handleClick("invasion", 5)}>{short.invasion[5]}</td>
            </tr>

            <tr className="specialties-level3">
              <th rowSpan="3">Palier 3</th>

              <td onClick={() => handleClick("military", 6)}>{short.military[6]}</td>
              <td onClick={() => handleClick("trading", 6)}>{short.trading[6]}</td>
              <td onClick={() => handleClick("technology", 6)}>{short.technology[6]}</td>
              <td onClick={() => handleClick("spying", 6)}>{short.spying[6]}</td>
              <td onClick={() => handleClick("exploration", 6)}>{short.exploration[6]}</td>
              <td onClick={() => handleClick("seclusion", 6)}>{short.seclusion[6]}</td>
              <td onClick={() => handleClick("invasion", 6)}>{short.invasion[6]}</td>
            </tr>

            <tr className="specialties-level3">
            <td onClick={() => handleClick("military", 7)}>{short.military[7]}</td>
              <td onClick={() => handleClick("trading", 7)}>{short.trading[7]}</td>
              <td onClick={() => handleClick("technology", 7)}>{short.technology[7]}</td>
              <td onClick={() => handleClick("spying", 7)}>{short.spying[7]}</td>
              <td onClick={() => handleClick("exploration", 7)}>{short.exploration[7]}</td>
              <td onClick={() => handleClick("seclusion", 7)}>{short.seclusion[7]}</td>
              <td onClick={() => handleClick("invasion", 7)}>{short.invasion[7]}</td>
            </tr>

            <tr className="specialties-level3">
            <td onClick={() => handleClick("military", 8)}>{short.military[8]}</td>
              <td onClick={() => handleClick("trading", 8)}>{short.trading[8]}</td>
              <td onClick={() => handleClick("technology", 8)}>{short.technology[8]}</td>
              <td onClick={() => handleClick("spying", 8)}>{short.spying[8]}</td>
              <td onClick={() => handleClick("exploration", 8)}>{short.exploration[8]}</td>
              <td onClick={() => handleClick("seclusion", 8)}>{short.seclusion[8]}</td>
              <td onClick={() => handleClick("invasion", 8)}>{short.invasion[8]}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="specialties-footer">
        <div ref={footerShort} className="specialties-footer-short"></div>
        <div ref={footerLong} className="specialties-footer-long"></div>
        <button ref={footerButton} className="specialties-footer-button">Sélectionner</button>
      </div>

    </div>
  );
};

export default Specialties;
