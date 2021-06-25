import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './selector.scss';

const Selector = ({ selected, content, clickedItem }) => {
  const mainSelector = useRef();
  const contentDiv = useRef();
  const [selectedItem, setSelectedItem] = useState(selected);
  
  useEffect(() => {
    contentDiv.current.style.width = contentDiv.current.offsetWidth + 20 + "px";
    mainSelector.current.style.width = contentDiv.current.style.width;
  }, [])

  const openCloseClick = () => {
    contentDiv.current.style.left = mainSelector.current.offsetLeft + "px";
    if (contentDiv.current.style.visibility === "visible") {
      contentDiv.current.style.visibility = "hidden";
    } else {
      contentDiv.current.style.visibility = "visible";
    }
  }

  const clickOnItem = (item, index) => {
    setSelectedItem(item);
    clickedItem(index);
  }

  return (
    <>
      <span ref={mainSelector} className="selector" onClick={openCloseClick}>
        <span className="selector-selected">{selectedItem}</span>
        <span className="selector-arrow"> ▼</span>
        <div ref={contentDiv} className="selector-content">
          {content.map((item, index) => (
            <div
              key={`contentItem${index}`}
              className="selector-content-item"
              onClick={() => (clickOnItem(item, index))}
            >{item}
            </div>
          ))}
        </div>
      </span>
    </>
  )
}

Selector.propTypes = {
  selected: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
  clickedItem: PropTypes.func.isRequired
}

export default Selector;
