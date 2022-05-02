import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import './ships.scss';
import SelectionTable from './SelectionTable';
import Orders from './Orders';
import ShipInfo from './ShipInfo';

import TestSquare from 'src/assets/images/test-square.svg';
import Zero from 'src/assets/images/zero.svg';
import DoubleArrow from 'src/assets/images/double-arrow.svg';
import { setResources } from '../../../actions/bases';

const Ships = ({
  selectedBase,
  getShips,
  ships,
  updateShipsBookmarks,
  dispatchBookmarks,
  getResources,
  resources,
  send,
}) => {
  // Translation
  const { t } = useTranslation('ships');

  // Get the list of ships when component mounts
  useEffect(() => {
    getShips();
  }, []);

  // Handle the tab between ships view and orders view
  const shipsTab = useRef();
  const ordersTab = useRef();
  const [tabChoice, setTabChoice] = useState('ships');

  useEffect(() => {
    if (tabChoice && shipsTab.current && ordersTab.current) {
      switch (tabChoice) {
        case 'ships':
          shipsTab.current.classList.add("ships-tab-active");
          ordersTab.current.classList.remove("ships-tab-active");
          break;
        case 'orders':
          ordersTab.current.classList.add("ships-tab-active");
          shipsTab.current.classList.remove("ships-tab-active");
          break;
      }
    }
  }, [tabChoice]);

  // Category to display
  const categoriesList = useRef([
    'allShips',
    'cargos',
    'civilianShips',
    'civilianStations',
    'militaryStations',
    'militaryShips',
    'motherShips',
    'miscellaneous',
    'bookmarked'
  ]);
  const [categoryToDisplay, setCategoryToDisplay] = useState('allShips');
  const [labelContent, setLabelContent] = useState('allShips');
  const highlightedButton = useRef(0);
  const buttons = useRef();
  const setActive = (e, category) => {
    if (category !== categoryToDisplay) {
      const buttonIndex = Array.from(e.target.parentElement.children).indexOf(e.target);
      highlightedButton.current = buttonIndex;
      setCategoryToDisplay(category);
      setLabelContent(category);
    }
  };

  const highlightButton = () => {
    if (buttons.current) {
      buttons.current.childNodes.forEach((button) => {
        button.classList.remove('ships-categories-active');
      });
      buttons.current.childNodes[highlightedButton.current].classList.add('ships-categories-active');
    }
  };

  useEffect(() => {
    highlightButton();
  });

  // Sort ships by category
  const [filteredShips, setFilteredShips] = useState([]);
  const filterShips = (category) => {
    setFilteredShips([]);
    if (category === 'allShips') {
      setFilteredShips(ships);
    } else if (category === 'bookmarked') {
      ships.forEach((ship) => {
        if (ship.bookmarked === 'true') {
          setFilteredShips(array => [...array, ship]);
        }
      });
    } else {
      ships.forEach((ship) => {
        if (ship.category === category) {
          setFilteredShips(array => [...array, ship]);
        }
      });
    };
  };

  useEffect(() => {
    if (ships && categoryToDisplay) filterShips(categoryToDisplay);
  }, [ships]);

  // Keep selected ships in memory
  const [selectedShips, setSelectedShips] = useState({});
  const setSelectedShipsFunction = (shipId, quantity) => {
    if (quantity === "") {
      setSelectedShips(selectedShips => (delete selectedShips[shipId], {...selectedShips}))
    } else {
      setSelectedShips(selectedShips => ({...selectedShips, [shipId]: quantity}));
    }
  }

  // Buttons to take all ships or none
  const [allShipsOrNone, setAllShipsOrNone] = useState('free');
  const takeAllDone = () => {
    setAllShipsOrNone('free');
  }

  // Show and close info of selected ship
  const [openInfo, setOpenInfo] = useState(false);
  const shipTechnicals = useRef();
  const showInfo = (ship) => {
    shipTechnicals.current = ship;
    setOpenInfo(true);
  }

  const hideInfo = () => {
    shipTechnicals.current = '';
    setOpenInfo(false);
  }

  // Keep ships sorting in memory
  const sorting = useRef([]);
  const sortingFunction = (sortedBy) => {
    sorting.current = sortedBy;
  }

  // Keep order in memory
  const [order, setOrder] = useState('none');

  // Keep resources loaded in memory
  const resourcesLoaded = useRef({});
  const setResourcesFunction = (resources) => {
    resourcesLoaded.current = resources;
  }

  // Keep speed in memory
  const [speed, setSpeed] = useState(100);
  const setSelectedSpeedFunction = (selectedSpeed) => {
    setSpeed(selectedSpeed);
  }

  // Keep bookmark changes in memory
  const newBookmarkedShips = useRef([]);
  const setBookmarks = (shipId) => {
    const alreadyExists = newBookmarkedShips.current.includes(shipId);
    if (alreadyExists) {
      newBookmarkedShips.current.forEach((ship, index) => {
        if (ship === shipId) {
          newBookmarkedShips.current.splice(index, 1);
          return;
        }
      });
    } else {
      newBookmarkedShips.current.push(shipId);
    }
    updateFinalBookmarks(shipId);
  };

  // Update bookmarks in redux only when page reloads in order to avoid rerender immediately
  useEffect(() => {
    if (ships !== undefined) {
      updateShipsBookmarks(selectedBase, newBookmarkedShips.current);
      newBookmarkedShips.current = [];
    }
  }, [categoryToDisplay, tabChoice]);

  // Dispatch to db when component unmounts
  const initialBookmarks = useRef();
  const initialBookmarksDone = useRef(false);
  const finalBookmarks = useRef();
  const newBookmarks = useRef({});
  useEffect(() => {
    if (ships !== undefined && ships.length > 0) {
      if (initialBookmarksDone.current === false) {
        initialBookmarks.current = ships.reduce((object, ship) => ({...object, [ship.id]: ship.bookmarked}), {});
        initialBookmarksDone.current = true;
      }
      finalBookmarks.current = ships.reduce((object, ship) => ({...object, [ship.id]: ship.bookmarked}), {});
    }
  }, [ships]);

  const updateFinalBookmarks = (shipId) => {
    if (finalBookmarks.current[shipId] === 'true') {
      finalBookmarks.current[shipId] = 'false';
    } else {
      finalBookmarks.current[shipId] = 'true';
    }
    for (const id in initialBookmarks.current) {
      if (initialBookmarks.current[id] !== finalBookmarks.current[id]) {
        newBookmarks.current[id] = finalBookmarks.current[id];
      } else {
        delete newBookmarks.current[id];
      }
    }
  }

  useEffect(() => {
    return () => {
      if (Object.keys(newBookmarks.current).length > 0)
        dispatchBookmarks(newBookmarks.current)
    };
  }, []);

  // Finally send ships
  const sendShipsFunction = () => {
    let finalArray = [];
    const shipsObject = {"ships": selectedShips};
    const orderObject = {"order": order};
    const resources = {"resources": resourcesLoaded.current};
    const speedObject = {"speed": speed};
    finalArray = [shipsObject, orderObject, speedObject];
    if (Object.keys(resourcesLoaded.current).length > 0) finalArray.push(resources);
    send(finalArray);
    setCategoryToDisplay("allShips");
    highlightedButton.current = 0;
    sorting.current = [];
    setSelectedShips({});
    setOrder("none");
    setSpeed(100);
    setTabChoice("ships");
  }

  return (
    <main className="ships">
      {ships && tabChoice &&
        <div className="ships-tab">
          <div ref={shipsTab} className="ships-tab-active" onClick={() => setTabChoice('ships')}>Sélectionner les vaisseaux</div>
          <div ref={ordersTab} onClick={() => setTabChoice('orders')}>Définir les ordres</div>
        </div>
      }
      {tabChoice === 'ships' && ships &&
        <section className="ships-categories">
          <div ref={buttons} className="ships-categories-buttons">
            {categoriesList.current.map(category => (
              <img
                key={`button-${category}`}
                src={TestSquare}
                className="ships-categories-icon"
                onMouseEnter={() => setLabelContent(category)}
                onMouseLeave={() => setLabelContent(categoryToDisplay)}
                onClick={(e) => setActive(e, category)}
              />
            ))}
          </div>
          <h1 className="ships-categories-label">{t(labelContent)}</h1>
          <div className="ships-categories-choose-all">
            <img src={Zero} onClick={() => setAllShipsOrNone('none')} />
            <img src={DoubleArrow} onClick={() => setAllShipsOrNone('all')} />
          </div>
        </section>
      }

      {tabChoice === 'ships' && ships && ships.length > 0 && filteredShips && filteredShips.length > 0 &&
        <SelectionTable
          ships={filteredShips}
          showInfo={(ship) => showInfo(ship)}
          setSelectedShips={setSelectedShipsFunction}
          selectedShips={selectedShips}
          takeAll={allShipsOrNone}
          takeAllDone={takeAllDone}
          setSorting={sortingFunction}
          getSorting={sorting.current}
          setBookmarks={setBookmarks}
          category={categoryToDisplay}
        />
      }

      {openInfo && <ShipInfo ship={shipTechnicals.current} close={hideInfo} />}
      
      {tabChoice === 'orders' && ships &&
        <Orders
          ships={ships}
          selectedShips={selectedShips}
          order={order}
          setOrder={setOrder}
          getResources={(boolean) => getResources(selectedBase, boolean)}
          resources={resources}
          setResources={setResourcesFunction}
          setSelectedSpeed={setSelectedSpeedFunction}
          speed={speed}
          sendShips={sendShipsFunction}
        />
      }

      {ships && Object.keys(ships).length === 0 &&
        <p>Aucun vaisseau n'est disponible sur la position.</p>
      }
      {ships && filteredShips.length === 0 && categoryToDisplay !== 'bookmarked' && categoryToDisplay !== 'allShips' &&
        <p>Aucun vaisseau de ce type n'est disponible.</p> 
      }
      {ships && filteredShips.length === 0 && categoryToDisplay === 'bookmarked' &&
        <p>Vous n'avez aucun vaisseau en favori.</p>
      }
    </main>
  );
};

export default Ships;
