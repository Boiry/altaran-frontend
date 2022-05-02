import React, { useEffect, useRef } from 'react';

import './aside.scss';

import Corner from 'src/assets/images/corner.svg'; 

const Aside = ({
  selectedBase,
  fetchBaseResources,
  baseResources,
  needResources,
  getResources,
  setResources,
}) => {
  useEffect(() => {
    fetchBaseResources();
  }, [selectedBase]);

  const formatize = (number) => new Intl.NumberFormat('fr-FR').format(number);
  
  const metal = useRef();
  const energy = useRef();
  const modifiedAlloy = useRef();
  const experimentalAlloy = useRef();
  const antimatter = useRef();
  const darkmatter = useRef();
  const rareResource = useRef();
  const population = useRef();
  const valik = useRef();

  useEffect(() => {
    let iterator;
    if (baseResources) {
      let metalAmount = parseFloat(baseResources.metal);
      let metalIncrement = parseFloat(baseResources.metal_production) / 3600;
      let energyAmount = parseFloat(baseResources.energy);
      let energyIncrement = parseFloat(baseResources.energy_production) / 3600;
      let modifiedAlloyAmount = parseFloat(baseResources.modified_alloy);
      let modifiedAlloyIncrement = parseFloat(baseResources.modified_alloy_production) / 3600;
      let experimentalAlloyAmount = parseFloat(baseResources.experimental_alloy);
      let experimentalAlloyIncrement = parseFloat(baseResources.experimental_alloy_production) / 3600;
      let antimatterAmount = parseFloat(baseResources.antimatter);
      let antimatterIncrement = parseFloat(baseResources.antimatter_production) / 3600;
      let darkmatterAmount = parseFloat(baseResources.darkmatter);
      let darkmatterIncrement = parseFloat(baseResources.darkmatter_production) / 3600;
      let rareResourceAmount = parseFloat(baseResources.rare_resource);
      let rareResourceIncrement = parseFloat(baseResources.rare_resource_production) / 3600;
      let populationAmount = parseFloat(baseResources.population);
      let populationIncrement = parseFloat(baseResources.population_growth) / 3600;
      let valikAmount = parseFloat(baseResources.valik);
      let valikIncrement = parseFloat(baseResources.valik_production) / 3600;

      function update() {
        metalAmount += metalIncrement;
        metal.current.textContent = `Metal : ${formatize(parseInt(metalAmount))}`;
        metal.current.amount = parseInt(metalAmount);
        energyAmount += energyIncrement;
        energy.current.textContent = `Énergie : ${formatize(parseInt(energyAmount))}`;
        energy.current.amount = parseInt(energyAmount);
        modifiedAlloyAmount += modifiedAlloyIncrement;
        modifiedAlloy.current.textContent = `Alliage modifié : ${formatize(parseInt(modifiedAlloyAmount))}`;
        modifiedAlloy.current.amount = parseInt(modifiedAlloyAmount);
        experimentalAlloyAmount += experimentalAlloyIncrement;
        experimentalAlloy.current.textContent = `Alliage expérimental : ${formatize(parseInt(experimentalAlloyAmount))}`;
        experimentalAlloy.current.amount = parseInt(experimentalAlloyAmount);
        antimatterAmount += antimatterIncrement;
        antimatter.current.textContent = `Antimatière : ${formatize(parseInt(antimatterAmount))}`;
        antimatter.current.amount = parseInt(antimatterAmount);
        darkmatterAmount += darkmatterIncrement;
        darkmatter.current.textContent = `Matière noire : ${formatize(parseInt(darkmatterAmount))}`;
        darkmatter.current.amount = parseInt(darkmatterAmount);
        rareResourceAmount += rareResourceIncrement;
        rareResource.current.textContent = `Ressource rare : ${formatize(parseInt(rareResourceAmount))}`;
        rareResource.current.amount = parseInt(rareResourceAmount);
        populationAmount += populationIncrement;
        population.current.textContent = `Population : ${formatize(parseInt(populationAmount))}`;
        population.current.amount = parseInt(populationAmount);
        valikAmount += valikIncrement;
        valik.current.textContent = `Valik : ${formatize(parseInt(valikAmount))}`;
        valik.current.amount = parseInt(valikAmount);
      }
      
      update();
      iterator = setInterval(update, 1000);
    }

    return () => {
      clearInterval(iterator);
    };
  }, [baseResources]);

  const dispatchResources = () => {
    const resources = {
      metal: metal.current.amount,
      energy: energy.current.amount,
      modifiedAlloy: modifiedAlloy.current.amount,
      experimentalAlloy: experimentalAlloy.current.amount,
      antimatter: antimatter.current.amount,
      darkmatter: darkmatter.current.amount,
      rareResource: rareResource.current.amount,
      population: population.current.amount,
      valik: valik.current.amount
    };
    setResources(selectedBase, resources);
  };

  useEffect(() => {
    if (needResources === true) {
      dispatchResources();
      getResources(selectedBase, false);
    }
  }, [needResources]);

  return (
    <aside className="resources">
      <img src={Corner} className="corner corner-top-left" />
      <img src={Corner} className="corner corner-top-right" />
      <img src={Corner} className="corner corner-bottom-left" />
      <img src={Corner} className="corner corner-bottom-right" />
      <h1>Planète {selectedBase}</h1>
      <h2>Coordonnées</h2>
      <p ref={metal}></p>
      <p ref={energy}></p>
      <p ref={modifiedAlloy}></p>
      <p ref={experimentalAlloy}></p>
      <p ref={antimatter}></p>
      <p ref={darkmatter}></p>
      <p ref={rareResource}></p>
      <p ref={population}></p>
      <p ref={valik}></p>
    </aside>
  );
};

export default Aside;
