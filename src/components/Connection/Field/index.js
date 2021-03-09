import React from 'react';
import PropTypes from 'prop-types';

import './field.scss';

const Field = ({
  value,
  type,
  name,
  placeholder,
  onChange,
}) => {

  const handleChange = (evt) => {
    onChange(evt.target.value, name);
  };

  const inputId = `field-${name}`;

  return (
    <>
      <label
      htmlFor={inputId}
      className="login-field-label"
      >
        {placeholder}
      </label>
      <input
        id={inputId}
        value={value}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        className="login-field"
      />
    </>
  );

};

Field.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Field.defaultProps = {
  value: '',
};

export default Field;
