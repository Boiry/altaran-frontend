import React, { useState, useRef, useEffect } from 'react';

import './selectionTable.scss';

import DoubleArrow from 'src/assets/images/double-arrow.svg';
import Zero from 'src/assets/images/zero.svg';
import Info from 'src/assets/images/info.svg';
import BookmarkOff from 'src/assets/images/bookmark-off.svg';
import BookmarkOn from 'src/assets/images/bookmark-on.svg';

const SelectionTable = ({
  ships,
  showInfo,
  setSelectedShips,
  selectedShips,
  takeAll,
  takeAllDone,
  setSorting,
  getSorting,
  setBookmarks,
  category,
}) => {  
  // Ships sorting
  const tableHeader = useRef();
  const [underlinedLabelIndex, setUnderlinedLabelIndex] = useState();
  const decorateAndSort = (e, sortBy) => {
    const labelIndex = Array.from(e.target.parentElement.children).indexOf(e.target);
    setUnderlinedLabelIndex(labelIndex);
    shipsSort(sortBy, labelIndex, false);
  }
  
  const [shipsArray, setShipsArray] = useState([]);
  const typeOrder = useRef('asc');
  const nameOrder = useRef('desc');
  const sortedBy = useRef('name');
  const shipsSort = (sortBy, labelIndex, keepSorting) => {
    let sortedShips = ships;
    if (category !== 'bookmarked' && tbody.current) {
      for (const row of tbody.current.childNodes) {
        row.classList.remove("ships-selection-row-closed");
        row.style.display = 'table-row';
        row.childNodes[0].childNodes[0].classList.remove("ships-selection-image-closed");
      }
    }
    switch (sortBy) {
      case 'type':
        if (!keepSorting && sortedBy.current === 'type' && typeOrder.current === 'desc' ||
        !keepSorting && sortedBy.current !== 'type' && typeOrder.current === 'asc' ||
        keepSorting && typeOrder.current === 'asc') {
          sortedShips.sort((a, b) => a.type.localeCompare(b.type));
          typeOrder.current = 'asc';
        } else {
          sortedShips.sort((a, b) => b.type.localeCompare(a.type));
          typeOrder.current = 'desc';
        }
        sortedBy.current = 'type';
        break;
      case 'name':
        if (!keepSorting && sortedBy.current === 'name' && nameOrder.current === 'desc' ||
          !keepSorting && sortedBy.current !== 'name' && nameOrder.current === 'asc' ||
          keepSorting && nameOrder.current === 'asc') {
          sortedShips.sort((a, b) => a.name.localeCompare(b.name));
          nameOrder.current = 'asc';
        } else {
          sortedShips.sort((a, b) => b.name.localeCompare(a.name));
          nameOrder.current = 'desc';
        }
        sortedBy.current = 'name';
        break;
      case 'alloy':
        let noneArray = [];
        let modArray = [];
        let expArray = [];
        sortedShips.forEach((ship) => {
          if (ship.modifiedAlloy !== '0') {
            modArray.push(ship);
          } else if (ship.experimentalAlloy !== '0') {
            expArray.push(ship);
          } else {
            noneArray.push(ship);
          }
        });
        modArray.sort((a, b) => +b.modifiedAlloy - +a.modifiedAlloy);
        expArray.sort((a, b) => +b.experimentalAlloy - +a.experimentalAlloy);
        sortedShips = [...expArray, ...modArray, ...noneArray];
        sortedBy.current = 'alloy';
        break;
      case 'bookmark':
        sortedShips.sort((a, b) => b.bookmarked.localeCompare(a.bookmarked));
        sortedBy.current = 'bookmark';
        break;
      case 'quantity':
        sortedShips.sort((a, b) => b.quantity - a.quantity);
        sortedBy.current = 'quantity';
        break;
      default:
        sortedShips.sort((a, b) => a.name.localeCompare(b.name));
    }
    setShipsArray([...sortedShips]);
    if (sortBy) {
      setSorting([sortBy, typeOrder.current, nameOrder.current, labelIndex || getSorting[3]]);
    }
  }

  // Reloading ships when they change (filtered, bookmarked) and dispatch to sort them
  useEffect(() => {
    if (getSorting.length > 0) {
      typeOrder.current = getSorting[1];
      nameOrder.current = getSorting[2];
      setUnderlinedLabelIndex(getSorting[3]);
      shipsSort(getSorting[0], null, true);
    } else {
      shipsSort();
    }
  }, [ships]);

  // Underlines the category title when sorted
  const underlineLabel = () => {
    if (tableHeader.current && underlinedLabelIndex) {
      tableHeader.current.childNodes.forEach((node) => {
        node.style.textDecoration = 'none';
      })
      tableHeader.current.childNodes[underlinedLabelIndex].style.textDecoration = 'underline';
    }
  }

  useEffect(() => {
    underlineLabel();
  }, [underlinedLabelIndex]);

  // Bookmarks
  const [messageInsteadOfTable, setMessageInsteadOfTable] = useState(false);
  const tbody = useRef();
  useEffect(() => {
    if (category !== 'bookmarked') setMessageInsteadOfTable(false);
  }, [category]);

  const addRemoveBookmark = (e, ship) => {
    let target, row;
    if (e.target.tagName === 'TD') {
      target = e.target.childNodes[0];
      row = e.target.parentNode;
    } else {
      target = e.target;
      row = e.target.parentNode.parentNode;
    }
    const bookmarked = target.dataset.bookmarked;
    if (bookmarked === 'true') {
      target.dataset.bookmarked = 'false';
      target.src = BookmarkOff;
    } else {
      target.dataset.bookmarked = 'true';
      target.src = BookmarkOn;
    }
    if (category === 'bookmarked') {
      let rows = [row];
      let type = 'sibling';
      while (type === 'sibling') {
        const nextElement = rows[rows.length - 1].nextSibling;
        if (nextElement && nextElement.nodeName === "TR") {
          rows.push(nextElement);
        } else {
          type = 'notSibling';
        }
      }
      row.childNodes[0].childNodes[0].classList.add("ships-selection-image-closed");
      row.classList.add("ships-selection-row-closed");
      for (let i=1; i<rows.length; i++) {
        rows[i].style.animation = '.5s translateUp, linear forwards';
      }
      setTimeout(() => {
        for (let i=1; i<rows.length; i++) {
          rows[i].style.animation = '';
        }
        row.style.display = "none";
        if (rows.length === 1) {
          setMessageInsteadOfTable(true);
        }
      }, 500);
    }
    setBookmarks(ship.id);
  }

  // Handle the 'all or none' feature for one ship type
  const clear = (e) => {
    setSelectedShips(e.target.nextSibling.nextSibling.dataset.id, "");
  }

  const fullfill = (e) => {
    setSelectedShips(e.target.nextSibling.dataset.id, e.target.nextSibling.dataset.quantity);
  }
  
  // Handle the 'all or none' feature for all the ships
  const quantityField = useRef([]);
  useEffect(() => {
    if (takeAll === 'none') {
      quantityField.current.forEach((entry) => {
        if (entry) setSelectedShips(entry.dataset.id, "");
      })
      takeAllDone();
    }
    if (takeAll === 'all') {
      quantityField.current.forEach((entry) => {
        if (entry) setSelectedShips(entry.dataset.id, entry.dataset.quantity);
      })
      takeAllDone();
    }
  }, [takeAll]);

  useEffect(() => {
    quantityField.current = [];
  });

  // Validate the value entered in input
  const formValidator = (shipId, value, max) => {
    if (/^[0-9]*$/.test(value)) {
      if (+value <= max) {
        setSelectedShips(shipId, value);
      } else {
        setSelectedShips(shipId, max);
      }
    }
  };

  // Insert the values in controlled fields
  const [selectedShipsObject, setSelectedShipsObject] = useState({});
  useEffect(() => {
    if (selectedShips) {
      setSelectedShipsObject({...selectedShips});
    }
  }, [selectedShips]);

  const format = (number) => (
    new Intl.NumberFormat('fr-FR').format(number)
  )

  return (
    <section className="ships-selection">
      {messageInsteadOfTable === false && shipsArray && shipsArray.length > 0 &&
        <table>
          <thead>
            <tr ref={tableHeader}>
              <th></th>
              <th onClick={e => decorateAndSort(e, 'type')}>Type</th>
              <th onClick={e => decorateAndSort(e, 'name')}>Nom</th>
              <th onClick={e => decorateAndSort(e, 'alloy')}>Alliage</th>
              <th onClick={e => decorateAndSort(e, 'bookmark')}>Favori</th>
              <th onClick={e => decorateAndSort(e, 'quantity')}>Quantité</th>
            </tr>
          </thead>
          <tbody ref={tbody}>
            {shipsArray.map((ship) => (
              <tr className="ships-selection-row" key={`ship-row-${ship.id}`}>
                <td>
                  <img
                    className="ships-selection-image"
                    src={require(`../../../../../public/mock/shipsImages/${ship.skin}.png`).default}
                  />
                </td>
                <td>{ship.type}</td>
                <td>
                  <div>
                    {ship.name}
                    <img
                      src={Info}
                      className="ships-selection-info"
                      onClick={() => showInfo(ship)}
                    />
                  </div>
                </td>
                <td>
                  {ship.modifiedAlloy === "0" && ship.experimentalAlloy === "0" &&
                    <div className="ships-selection-alloy ships-selection-alloy-none"></div>
                  }
                  {ship.modifiedAlloy !== "0" &&
                    <div className="ships-selection-alloy ships-selection-alloy-modified">{ship.modifiedAlloy}</div>
                  }
                  {ship.experimentalAlloy !== "0" &&
                    <div className="ships-selection-alloy ships-selection-alloy-experimental">{ship.experimentalAlloy}</div>
                  }
                </td>
                <td
                  className="ships-selection-bookmark"
                  onClick={(e) => addRemoveBookmark(e, ship)}
                >
                  {ship.bookmarked === 'false' &&
                    <img data-bookmarked={false} src={BookmarkOff} />
                  }
                  {ship.bookmarked === 'true' &&
                    <img data-bookmarked={true} src={BookmarkOn} />
                  }
                </td>
                <td>
                  <div>
                    <img
                      src={Zero}
                      className="ships-selection-clear"
                      onClick={(e) => clear(e)}
                    />
                    <img 
                      src={DoubleArrow}
                      className="ships-selection-fullfill"
                      onClick={(e) => fullfill(e)}
                    />
                    <input
                      ref={ref => quantityField.current.push(ref)}
                      type='text'
                      data-id={ship.id}
                      data-quantity={ship.quantity}
                      value={selectedShipsObject[ship.id] || ''}
                      onChange={(e) => formValidator(ship.id, e.target.value, ship.quantity)}
                    />&nbsp;/ {format(ship.quantity)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
      {messageInsteadOfTable &&
        <p className="ships-selection-message">Vous n'avez plus de vaisseau en favori.</p>
      }
    </section>
  );
};

export default SelectionTable;
