import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import './orders.scss';
import Icon from './Icon';
import Resource from './Resource';
import SpeedBar from './speedBar';

import TestSquare from 'src/assets/images/test-square.svg';
import Zero from 'src/assets/images/zero.svg';
import DoubleArrow from 'src/assets/images/double-arrow.svg';

const Orders = ({
  ships,
  selectedShips,
  order,
  setOrder,
  getResources,
  resources,
  setResources,
  setSelectedSpeed,
  speed,
  sendShips,
}) => {
  // Translation
  const { t } = useTranslation('ships');

  // Handle of the resources loading
  const refsObject = {
    metal: useRef(),
    energy: useRef(),
    modifiedAlloy: useRef(),
    experimentalAlloy: useRef(),
    antimatter: useRef(),
    darkmatter: useRef(),
    rareResource: useRef(),
    population: useRef()
  };

  // When a number is entered in an input
  const preparedInputArgs = useRef([]);
  const prepareInput = (e, ref) => {
    getResources(true);
    preparedInputArgs.current = [e.target.value, ref];
  }

  const availableResources = useRef({});
  useEffect(() => {
    if (resources && preparedInputArgs.current.length > 0) {
      availableResources.current = resources;
      handleResourceInput(preparedInputArgs.current[0], preparedInputArgs.current[1]);
      preparedInputArgs.current = [];
      getResources(false);
    }
  }, [resources])

  const handleResourceInput = (targetValue, ref) => {
    const value = unformat(targetValue);
    if (/^[0-9]*$/.test(value)) {
      calculateCargoUse(ref);
      if (value + cargoLoaded.current <= cargoCapacity.current) {
        if (value <= availableResources.current[ref]) {
          refsObject[ref].current.quantity = +value;
          refsObject[ref].current.value = format(value);
        } else {
          refsObject[ref].current.quantity = +availableResources.current[ref];
          refsObject[ref].current.value = format(availableResources.current[ref]);
        }
      } else {
        refsObject[ref].current.quantity = cargoCapacity.current - cargoLoaded.current;
        refsObject[ref].current.value = format(cargoCapacity.current - cargoLoaded.current);
      }
    } else {
      refsObject[ref].current.value = format(refsObject[ref].current.value.slice(0, -1));
    }
    calculateCargoUse();
  }

  // When a button "empty" is clicked
  const empty = (ref) => {
    if (ref === 'all') {
      for (const ref in refsObject) {
        refsObject[ref].current.quantity = 0;
        refsObject[ref].current.value = "";
      }
      setCargoUse(0);
    } else {
      refsObject[ref].current.quantity = 0;
      refsObject[ref].current.value = "";
      calculateCargoUse();
    }
  }

  // When a button "fullfill" is clicked
  const resource = useRef();
  const fullfill = (neededResource, step, response) => {
    if (step === 'step1') {
      getResources(true);
      resource.current = neededResource;
    } else {
      if (resource.current === "all") {
        for (const ref in refsObject) {
          calculateCargoUse(ref);
          if (cargoLoaded.current + response[ref] > cargoCapacity.current) {
            refsObject[ref].current.quantity = cargoCapacity.current - cargoLoaded.current;
            refsObject[ref].current.value = format(cargoCapacity.current - cargoLoaded.current);
            break;
          } else {
            refsObject[ref].current.quantity = response[ref];
            refsObject[ref].current.value = format(response[ref]);
          }
        }
      } else {
        calculateCargoUse(resource.current);
        if (cargoLoaded.current + response[resource.current] > cargoCapacity.current) {
          refsObject[resource.current].current.quantity = cargoCapacity.current - cargoLoaded.current;
          refsObject[resource.current].current.value = format(cargoCapacity.current - cargoLoaded.current);
        } else {
          refsObject[resource.current].current.quantity = response[resource.current];
          refsObject[resource.current].current.value = format(response[resource.current]);
        }
      }
      resource.current = "";
      calculateCargoUse();
    }
  }

  useEffect(() => {
    if (resources && resource.current) {
      fullfill(null, 'step2', resources);
      getResources(false);
    }
  }, [resources]);

  // Cargo capacity
  const cargoCapacity = useRef(0);
  useEffect(() => {
    for (const selectedShipId in selectedShips) {
      for (const index of ships) {
        if (selectedShipId === index.id) {
          cargoCapacity.current += +index.cargo * selectedShips[selectedShipId];
        }
      }
    }
  }, []);

  // Cargo use
  useEffect(() => {
    if (refsObject.metal.current) {
      for (const ref in refsObject) {
        refsObject[ref].current.quantity = 0;
      }
    }
  }, []);

  const [cargoUse, setCargoUse] = useState(0);
  const cargoLoaded = useRef(0);
  const calculateCargoUse = (withoutRef = null) => {
    let totalCargoUsed = 0;
    for (const ref in refsObject) {
      if (withoutRef !== null && withoutRef === ref) continue;
      totalCargoUsed += refsObject[ref].current.quantity;
    };
    setCargoUse(Math.round((totalCargoUsed / cargoCapacity.current) * 100));
    cargoLoaded.current = totalCargoUsed;
    sendResources();
  }

  // Send resources selected to parent component
  const sendResources = () => {
    let resourcesToSend = {};
    for (const resource in refsObject) {
      if (refsObject[resource].current.quantity !== 0) {
        resourcesToSend[resource] = refsObject[resource].current.quantity;
      }
    }
    setResources(resourcesToSend);
  }

  // Send speed to parent component
  const changeSpeed = (e) => {
    typeof(e) === "number" ? setSelectedSpeed(e) : setSelectedSpeed(e.target.value);
  };

  // Get the max speed of the fleet
  const maxSpeed = useRef();
  useEffect(() => {
    let speedArray = [];
    for (const selectedShip in selectedShips) {
      for (const ship of ships) {
        if (selectedShip === ship.id) speedArray.push(ship.speed);
      }
    }
    maxSpeed.current = Math.min(...speedArray);    
  }, []);

  // Set the real amount of speed from speed percent
  const [realSpeed, setRealSpeed] = useState(0);
  useEffect(() => {
    setRealSpeed(Math.round((speed / 100) * maxSpeed.current * 100) / 100);
  }, [speed]);

  // Other stuffs
  const openObjectsPanel = (e) => {
    e.preventDefault();
    console.log('objets')
  }

  const chooseDay = (e) => {
    e.preventDefault();
    console.log('jour')

  }
  const submit = (e) => {
    e.preventDefault();
    console.log('submit')
    sendShips();
  }

  const format = (number) => (
    new Intl.NumberFormat('fr-FR').format(number)
  )

  const unformat = (string) => (
    +string.replaceAll(/\s/g, "")
  )

  return (
    <div className="ships-orders-frame">
      {Object.keys(selectedShips).length > 0 &&
        <>
          <section className="ships-orders-frame-icons">
            <Icon icon={TestSquare} order={'Baser'} select={setOrder} selected={order} />
            <Icon icon={TestSquare} order={'Baser agressif'} select={setOrder} selected={order} />
            <Icon icon={TestSquare} order={'Donner'} select={setOrder} selected={order} />
            <Icon icon={TestSquare} order={'Vendre'} select={setOrder} selected={order} />
            <Icon icon={TestSquare} order={'Transporter'} select={setOrder} selected={order} />
            <Icon icon={TestSquare} order={'Récolter'} select={setOrder} selected={order} />
            <Icon icon={TestSquare} order={'Explorer'} select={setOrder} selected={order} />
            <Icon icon={TestSquare} order={'Espionner'} select={setOrder} selected={order} />
            <Icon icon={TestSquare} order={'Surveiller'} select={setOrder} selected={order} />
            <Icon icon={TestSquare} order={'Utiliser'} select={setOrder} selected={order} />
            <Icon icon={TestSquare} order={'Attaquer'} select={setOrder} selected={order} />
            <Icon icon={TestSquare} order={'Piller'} select={setOrder} selected={order} />
            <Icon icon={TestSquare} order={'Intercepter'} select={setOrder} selected={order} />
            <Icon icon={TestSquare} order={'Escorter'} select={setOrder} selected={order} />
            <Icon icon={TestSquare} order={'Patrouiller'} select={setOrder} selected={order} />
            <Icon icon={TestSquare} order={'Défendre'} select={setOrder} selected={order} />
            <Icon icon={TestSquare} order={'Embargo'} select={setOrder} selected={order} />
          </section>
          <hr />
          <form>
            <div className="ships-orders-frame-end">
              <table>
                <thead>
                  <tr>
                    <th colSpan="2">Embarquer des ressources</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="2">
                      <img src={Zero} width="15px" onClick={() => empty('all')} />
                      <img src={DoubleArrow} width="30px" onClick={() => fullfill('all', 'step1')} />
                    </td>
                  </tr>
                  {Object.keys(refsObject).map(key => (
                    <tr key={`tr-${key}`}>
                      <td style={{ textAlign: 'right' }}>
                        <Resource name={t(key)} empty={() => empty(key)} fullfill={() => fullfill(key, 'step1')} />
                      </td>
                      <td><input type='text' ref={refsObject[key]} onChange={e => prepareInput(e, key)} /></td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="2">Espace de fret disponible : {format(cargoCapacity.current)}</td>
                  </tr>
                  {cargoCapacity.current !== 0 &&
                    <tr>
                      <td colSpan="2">Espace de fret utilisé : {cargoUse}%</td>
                    </tr>
                  }
                  <tr>
                    <td colSpan="2" style={{ height: '50px', verticalAlign: 'bottom' }}><button onClick={openObjectsPanel}>Objets</button></td>
                  </tr>
                </tbody>
              </table>
              
              <div className="ships-orders-frame-end-right">
                Coordonnées de la destination
                <div className="ships-orders-frame-end-right-coordinates">
                  <input type='text' />
                  <input type='text' />
                  <input type='text' />
                  <input type='text' />
                  <input type='text' />
                </div>
                
                <button>Coordonnées enregistrées</button>
            
                <div className="ships-orders-frame-end-right-speed">
                  <div>Vitesse ({realSpeed} / {maxSpeed.current})</div>
                  1%<SpeedBar selectedSpeed={speed} setSelectedSpeed={changeSpeed} />100%
                  <input type='number' min='1' max='100' value={speed} onChange={changeSpeed} />
                </div>

                <div className="ships-orders-frame-end-right-arrival">
                  <div>Arrivée à</div>
                  <input type='text' />h
                  <input type='text' />m
                  <input type='text' />s
                </div>

                <button onClick={chooseDay}>Tel jour</button>

              </div>
            </div>
            <button className="ships-orders-frame-end-submit" type="submit" onClick={submit}>Envoyer</button>
          </form>
        </>
      }
      {Object.keys(selectedShips).length === 0 &&
        <p className="ships-orders-frame-message">Vous n'avez sélectionné aucun vaisseau.</p>
      }
    </div>
  );
};

export default Orders;
