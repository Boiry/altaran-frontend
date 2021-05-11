import React from 'react';
import PropTypes from 'prop-types';

import './item.scss';

const Item = ({
  image,
  name,
  className,
  level,
  handleClick,
}) => (
  <span className="item">
    <img
      src={image}
      className={`item-icon ${className} item-${name}`}
      onClick={() => (handleClick && handleClick(name))} alt=""
    />
    {level && <div className="item-level">{level}</div>}
  </span>
);

export default Item;

Item.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  level: PropTypes.string,
  handleClick: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]).isRequired,
};

Item.defaultProps = {
  className: '',
  level: '',
};
