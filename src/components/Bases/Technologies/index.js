import React, { useEffect } from 'react';

import { init } from './overItemsHandler.js';
import './technologies.scss';

import Laser from 'src/assets/images/icons/laser.svg';
import Fission from 'src/assets/images/icons/fission.svg';
import Ballistic from 'src/assets/images/icons/ballistic.svg';
import Frame1 from 'src/assets/images/icons/frame1.svg';
import Thruster from 'src/assets/images/icons/thruster.svg';
import Book from 'src/assets/images/icons/book.svg';
import Brain from 'src/assets/images/icons/brain.svg';
import Binary from 'src/assets/images/icons/binary.svg';
import Geophysics from 'src/assets/images/icons/geophysics.svg';
import Energy from 'src/assets/images/icons/energy.svg';
import Lock from 'src/assets/images/icons/lock.svg';
import Nanotechnology from 'src/assets/images/icons/nanotechnology.svg';
import Particle from 'src/assets/images/icons/particle.svg';
import Explosion from 'src/assets/images/icons/explosion.svg';
import Frame2 from 'src/assets/images/icons/frame2.svg';
import Wormhole from 'src/assets/images/icons/wormhole.svg';
import Star from 'src/assets/images/icons/star.svg';
import Neuron from 'src/assets/images/icons/neuron.svg';
import Atom from 'src/assets/images/icons/atom.svg';
import Alchemy from 'src/assets/images/icons/alchemy.svg';
import Expansion from 'src/assets/images/icons/expansion.svg';
import Darkmatter from 'src/assets/images/icons/darkmatter.svg';
import Stabilizer from 'src/assets/images/icons/stabilizer.svg';
import ArrowTop from 'src/assets/images/icons/arrow-top.svg';
import Tool from 'src/assets/images/icons/tool.svg';
import Frame3 from 'src/assets/images/icons/frame3.svg';

const Technology = () => {
  useEffect(() => {
    init();
  });
  return (
    <>
    <div className="technologies-menu">
      <div className="technologies-menu-title technologies-menu-elementary">Technologies élémentaires</div>
      <div className="technologies-menu-items">
        <img src={Laser} className="technologies-menu-item technologies-elementary" />
        <img src={Fission} className="technologies-menu-item technologies-elementary" />
        <img src={Ballistic} className="technologies-menu-item technologies-elementary" />
        <img src={Frame1} className="technologies-menu-item technologies-elementary" />
        <img src={Thruster} className="technologies-menu-item technologies-elementary" />
        <img src={Book} className="technologies-menu-item technologies-elementary" />
        <img src={Brain} className="technologies-menu-item technologies-elementary" />
        <img src={Binary} className="technologies-menu-item technologies-elementary" />
        <img src={Geophysics} className="technologies-menu-item technologies-elementary" />
        <img src={Energy} className="technologies-menu-item technologies-elementary" />
        <img src={Lock} className="technologies-menu-item technologies-elementary" />
        <img src={Nanotechnology} className="technologies-menu-item technologies-elementary" />
        <img src={Particle} className="technologies-menu-item technologies-elementary" />
      </div>
      <div className="technologies-menu-title technologies-menu-advanced">Technologies avancées</div>
      <div className="technologies-menu-items">
        <img src={Explosion} className="technologies-menu-item technologies-advanced" />
        <img src={Frame2} className="technologies-menu-item technologies-advanced" />
        <img src={Wormhole} className="technologies-menu-item technologies-advanced" />
        <img src={Star} className="technologies-menu-item technologies-advanced" />
        <img src={Neuron} className="technologies-menu-item technologies-advanced" />
        <img src={Atom} className="technologies-menu-item technologies-advanced" />
        <img src={Alchemy} className="technologies-menu-item technologies-advanced" />
        <img src={Expansion} className="technologies-menu-item technologies-advanced" />
        <img src={Darkmatter} className="technologies-menu-item technologies-advanced" />
      </div>
      <div className="technologies-menu-title technologies-menu-mothership">Technologies de vaisseau mère</div>
      <div className="technologies-menu-items">
        <img src={Stabilizer} className="technologies-menu-item technologies-mothership" />
        <img src={ArrowTop} className="technologies-menu-item technologies-mothership" />
        <img src={Tool} className="technologies-menu-item technologies-mothership" />
        <img src={Frame3} className="technologies-menu-item technologies-mothership" />
      </div>
    </div>
    </>
  );
};

export default Technology;
