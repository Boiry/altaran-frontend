import React, { useEffect } from 'react';

import { init } from './animations.js';
import './facilities.scss';

import Mine from 'src/assets/images/icons/mine.svg';
import Geothermal from 'src/assets/images/icons/geothermal.svg';
import Fusion from 'src/assets/images/icons/fusion.svg';
import Catalyser from 'src/assets/images/icons/catalyser.svg';
import Battery from 'src/assets/images/icons/battery.svg';
import Alchemy from 'src/assets/images/icons/alchemy.svg';
import Atom from 'src/assets/images/icons/atom.svg';
import Darkmatter from 'src/assets/images/icons/darkmatter.svg';
import Dollar from 'src/assets/images/icons/dollar.svg';
import Metropolis from 'src/assets/images/icons/metropolis.svg';
import Wealth from 'src/assets/images/icons/wealth.svg';
import Robot from 'src/assets/images/icons/robot.svg';
import Server from 'src/assets/images/icons/server.svg';
import Hammer from 'src/assets/images/icons/hammer.svg';
import University from 'src/assets/images/icons/university.svg';
import Barracks from 'src/assets/images/icons/barracks.svg';
import Tool from 'src/assets/images/icons/tool.svg';
import Magnifying from 'src/assets/images/icons/magnifying.svg';
import ArrowTop from 'src/assets/images/icons/arrow-top.svg';
import Politics from 'src/assets/images/icons/politics.svg';
import Obelisk from 'src/assets/images/icons/obelisk.svg';
import Gear from 'src/assets/images/icons/gear.svg';
import Concentrator from 'src/assets/images/icons/concentrator.svg';
import Planet from 'src/assets/images/icons/planet.svg';
import Stabilizer from 'src/assets/images/icons/stabilizer.svg';
import Lock from 'src/assets/images/icons/lock.svg';
import ArrowLeft from 'src/assets/images/icons/arrow-left.svg';
import Relifer from 'src/assets/images/icons/relifer.svg';

const Facilities = () => {
  useEffect(() => {
    init();
  });
  return (
    <div className="facilities-menu">
      <div className="facilities-menu-title facilities-menu-production">Production</div>
      <div className="facilities-menu-items">
        <img src={Mine} className="facilities-menu-item production" />
        <img src={Geothermal} className="facilities-menu-item production" />
        <img src={Fusion} className="facilities-menu-item production" />
        <img src={Catalyser} className="facilities-menu-item production" />
        <img src={Battery} className="facilities-menu-item production" />
        <img src={Alchemy} className="facilities-menu-item production" />
        <img src={Atom} className="facilities-menu-item production" />
        <img src={Darkmatter} className="facilities-menu-item production" />
        <img src={Dollar} className="facilities-menu-item production" />
        <img src={Metropolis} className="facilities-menu-item production" />
        <img src={Wealth} className="facilities-menu-item production" />
      </div>
      <div className="facilities-menu-title facilities-menu-logistics">Logistique</div>
      <div className="facilities-menu-items">
        <img src={Robot} className="facilities-menu-item logistics" />
        <img src={Server} className="facilities-menu-item logistics" />
        <img src={Hammer} className="facilities-menu-item logistics" />
        <img src={University} className="facilities-menu-item logistics" />
        <img src={Barracks} className="facilities-menu-item logistics" />
        <img src={Tool} className="facilities-menu-item logistics" />
      </div>
      <div className="facilities-menu-title facilities-menu-civilian">Civil</div>
      <div className="facilities-menu-items">
        <img src={Magnifying} className="facilities-menu-item civilian" />
        <img src={ArrowTop} className="facilities-menu-item civilian" />
        <img src={Politics} className="facilities-menu-item civilian" />
        <img src={Obelisk} className="facilities-menu-item civilian" />
        <img src={Gear} className="facilities-menu-item civilian" />
        <img src={Concentrator} className="facilities-menu-item civilian" />
      </div>
      <div className="facilities-menu-title facilities-menu-advanced">Avancé</div>
      <div className="facilities-menu-items">
        <img src={Planet} className="facilities-menu-item advanced" />
        <img src={Stabilizer} className="facilities-menu-item advanced" />
        <img src={Lock} className="facilities-menu-item advanced" />
        <img src={ArrowLeft} className="facilities-menu-item advanced" />
        <img src={Relifer} className="facilities-menu-item advanced" />
      </div>
    </div>
  );
};

export default Facilities;
