import React, { useEffect, useRef } from 'react';

import './shipInfo.scss';

import Corner from 'src/assets/images/corner.svg'; 

const ShipInfo = ({
  ship,
  close,
}) => {
  const frame = useRef();
  useEffect(() => {
    if (frame.current) {
      frame.current.style.top = window.pageYOffset + "px";
      frame.current.style.visibility = "visible";
      frame.current.focus();
    }
    return () => {
      frame.current.style.visibility = "hidden";
    }
  }, [frame]);

  const format = (number) => (
    new Intl.NumberFormat('fr-FR').format(number)
  )

  return (
    <div ref={frame} className="ships-info" tabIndex="1" onBlur={close}>
      <img src={Corner} className="corner corner-top-left" />
      <img src={Corner} className="corner corner-top-right" />
      <img src={Corner} className="corner corner-bottom-left" />
      <img src={Corner} className="corner corner-bottom-right" />
      <h1>{ship.name}</h1>
      <table>
        <tbody>
          <tr>
            <td>Dégâts :</td>
            <td>{format(ship.weapon)}</td>
          </tr>
          <tr>
            <td>Structure :</td>
            <td>{format(ship.structure)}</td>
          </tr>
          <tr>
            <td>Bouclier :</td>
            <td>{format(ship.shield)}</td>
          </tr>
          <tr>
            <td>Vitesse :</td>
            <td>{format(ship.speed)}</td>
          </tr>
          <tr>
            <td>Temps de manoeuvre :</td>
            <td>{format(ship.maneuver)}</td>
          </tr>
        </tbody>
      </table>
      <p>Construit par l'Empire de {ship.origin}.</p>
      <button onClick={close}>Fermer</button>
    </div>
  );
};

export default ShipInfo;
