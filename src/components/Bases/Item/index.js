import React from 'react';
import PropTypes from 'prop-types';

import './item.scss';

const Item = ({
  image,
  name,
  className,
  level,
  current,
  handleClick,
  handleHover,
  handleOut,
}) => (
  <span className="item">
    <img
      src={image}
      alt={name}
      className={`item-icon ${className} item-${name} ${current && "item-is-active"}`}
      onClick={() => (handleClick && handleClick(name))}
      onMouseOver={() => (handleHover && handleHover(name))}
      onMouseOut={() => (handleOut && handleOut(''))}
    />
    {level && <div className="item-level">{level}</div>}
  </span>
);


export default Item;

Item.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  level: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  current: PropTypes.bool,
  handleClick: PropTypes.func,
  handleHover: PropTypes.func,
  handleOut: PropTypes.func,
};

Item.defaultProps = {
  className: '',
  level: '',
  current: false,
  handleClick: null,
  handleHover: null,
  handleOut: null,
};
