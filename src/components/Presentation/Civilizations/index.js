import React, { useState, useRef } from 'react';

import Card from './Card';
import Frame from './Frame';

import './civilizations.scss';

const Civilizations = ({ selectCivilization }) => {
  const frameName = useRef("");
  const [update, setUpdate] = useState(false);
  const openFrame = (name) => {
    frameName.current = name;
    setUpdate(true);
  }

  return (
    <>
      <section className="presentation-civilizations">
        <Card name="Arinesse" open={name => openFrame(name)} selectCivilization={name => selectCivilization(name)} />
        <Card name="Zet-Ha" open={name => openFrame(name)} selectCivilization={name => selectCivilization(name)} />
        <Card name="Xel-Nirr Ortolis" open={name => openFrame(name)} selectCivilization={name => selectCivilization(name)} />
        <Card name="Kha'Od" open={name => openFrame(name)} selectCivilization={name => selectCivilization(name)} />
        <Card name="Kertsakar" open={name => openFrame(name)} selectCivilization={name => selectCivilization(name)} />
        <Card name="Xol To" open={name => openFrame(name)} selectCivilization={name => selectCivilization(name)} />
      </section>
      <Frame name={frameName.current} update={update} updated={() => setUpdate(false)} />
    </>
  );
};

export default Civilizations;
