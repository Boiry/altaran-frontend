import React from 'react';
import PropTypes from 'prop-types';

import './field.scss';

import Arrow from 'src/assets/images/selectorArrow.svg';

const Field = ({
  name,
  type,
  value,
  onChange,
  onClick,
}) => {
  const inputId = `field-${name}`;
  const arrowId = `arrow-${name}`;
  const handleChange = (evt) => {
    if (/^[0-9]*$/.test(evt.target.value) && evt.target.value.length < 4) {
      onChange(evt.target.value, name);
    }
  };
  const handleClick = (evt) => {
    onClick(evt.target.id);
  }
  return (
    <span className="map-field">
      <input
        id={inputId}
        value={value}
        type={type}
        name={name}
        onChange={handleChange}
        className="map-input"
      />
      <img src={Arrow} id={arrowId} className="map-selector-arrow" onClick={handleClick} />
    </span>
  );
};

Field.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

Field.defaultProps = {
  value: '',
};

export default Field;
