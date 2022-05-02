import React, { useRef, useEffect } from 'react';

import './icon.scss';

const Icon = ({ icon, order, select, selected }) => {
  const image = useRef();

  const setHighlight = () => {
    image.current.style.border = '1px solid #5dbae0';
    image.current.style.filter = 'saturate(200%)';
  }

  const removeHighlight = () => {
    image.current.style.border = 'none';
    image.current.style.filter = 'saturate(100%)';
  }

  const hoverOrder = (mouseAction) => {
    if (mouseAction === 'enter') {
      setHighlight();
    } else {
      if (selected !== order) removeHighlight();
    }
  }

  useEffect(() => {
    selected === order ? setHighlight() : removeHighlight();
  }, [selected]);

  return (
    <div
      className="ships-orders-frame-icon"
      onMouseEnter={() => hoverOrder('enter')}
      onMouseLeave={() => hoverOrder('leave')}
      onClick={() => select(order)}
    >
      <figure>
        <img ref={image} src={icon}></img>
        <figcaption>{order}</figcaption>
      </figure>
    </div>
  );
};

export default Icon;
