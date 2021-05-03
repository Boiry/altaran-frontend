import React, { useEffect } from 'react';

import './aside.scss';

import Corner from 'src/assets/images/corner.svg'; 

const Aside = ({ selectedBase, infos, launchFetchBaseInfos }) => {
  useEffect(() => {
    launchFetchBaseInfos();
  }, [selectedBase]);

  const formatize = (number) => {
    return new Intl.NumberFormat('fr-FR').format(number);
  }

  useEffect(() => {
    let iterator;
    if (infos) {
      let metalAmount = parseFloat(infos.metal);
      let metalIncrement = parseFloat(infos.metal_production) / 60 / 60;
      let energyAmount = parseFloat(infos.energy);
      let energyIncrement = parseFloat(infos.energy_production) / 60 / 60;
      let alloyAmount = parseFloat(infos.alloy);
      let alloyIncrement = parseFloat(infos.alloy_production) / 60 / 60;
      let experimentalAmount = parseFloat(infos.experimental);
      let experimentalIncrement = parseFloat(infos.experimental_production) / 60 / 60;
      let darkmatterAmount = parseFloat(infos.darkmatter);
      let darkmatterIncrement = parseFloat(infos.darkmatter_production) / 60 / 60;
      let antimatterAmount = parseFloat(infos.antimatter);
      let antimatterIncrement = parseFloat(infos.antimatter_production) / 60 / 60;
      let luxuryAmount = parseFloat(infos.luxury);
      let luxuryIncrement = parseFloat(infos.luxury_production) / 60 / 60;
      let populationAmount = parseFloat(infos.population);
      let populationIncrement = parseFloat(infos.population_growth) / 60 / 60;
      let moneyAmount = parseFloat(infos.money);
      let moneyIncrement = parseFloat(infos.money_production) / 60 / 60;

      function update() {
        metalAmount += metalIncrement;
        document.getElementById('metal').textContent = `Metal : ${formatize(parseInt(metalAmount))}`;
        energyAmount += energyIncrement;
        document.getElementById('energy').textContent = `Énergie : ${formatize(parseInt(energyAmount))}`;
        alloyAmount += alloyIncrement;
        document.getElementById('alloy').textContent = `Alliage modifié : ${formatize(parseInt(alloyAmount))}`;
        experimentalAmount += experimentalIncrement;
        document.getElementById('experimental').textContent = `Alliage expérimental : ${formatize(parseInt(experimentalAmount))}`;
        darkmatterAmount += darkmatterIncrement;
        document.getElementById('darkmatter').textContent = `Matière noire : ${formatize(parseInt(darkmatterAmount))}`;
        antimatterAmount += antimatterIncrement;
        document.getElementById('antimatter').textContent = `Antimatière : ${formatize(parseInt(antimatterAmount))}`;
        luxuryAmount += luxuryIncrement;
        document.getElementById('luxury').textContent = `Ressource de luxe : ${formatize(parseInt(luxuryAmount))}`;
        populationAmount += populationIncrement;
        document.getElementById('population').textContent = `Population : ${formatize(parseInt(populationAmount))}`;
        moneyAmount += moneyIncrement;
        document.getElementById('money').textContent = `Bidou : ${formatize(parseInt(moneyAmount))}`;
      }
      update();
      iterator = setInterval(update, 1000);
    }
    return () => {
      clearInterval(iterator);
    };
  });

  return (
    <aside className="resources">
      <img src={Corner} className="corner corner-top-left" />
      <img src={Corner} className="corner corner-top-right" />
      <img src={Corner} className="corner corner-bottom-left" />
      <img src={Corner} className="corner corner-bottom-right" />
      <h1>Planète {selectedBase}</h1>
      <h2>Coordonnées</h2>
      <p id="metal"></p>
      <p id="energy"></p>
      <p id="alloy"></p>
      <p id="experimental"></p>
      <p id="darkmatter"></p>
      <p id="antimatter"></p>
      <p id="luxury"></p>
      <p id="population"></p>
      <p id="money"></p>
    </aside>
  );
};

export default Aside;
