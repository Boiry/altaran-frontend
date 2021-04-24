import React from 'react';
import PropTypes from 'prop-types';

import './field.scss';

const Field = ({
  name,
  type,
  value,
  onChange,
}) => {
  const inputId = `field-${name}`;
  const handleChange = (evt) => {
    if (/^[0-9]*$/.test(evt.target.value) && evt.target.value.length < 4) {
      onChange(evt.target.value, name);
    }
  };
  return (
    <input
      id={inputId}
      value={value}
      type={type}
      name={name}
      onChange={handleChange}
      className="map-field"
    />
  );
};

Field.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Field.defaultProps = {
  value: '',
};

export default Field;
