import React from 'react';
import PropTypes from 'prop-types';

import Field from '../Field';
import './register.scss';

const Register = ({
  username,
  email,
  password,
  matchingPassword,
  usernameErrorMessage,
  passwordErrorMessage,
  changeField,
  handleLogin,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin();
  };

  return (
    <div className="register">
      <form className="register-form" onSubmit={handleSubmit}>
        <Field
          name="username"
          type="text"
          placeholder="Nom d'empire"
          value={username}
          onChange={changeField}
        />
        <Field
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={changeField}
        />
        <div className="register-username-error-message">{usernameErrorMessage}</div>
        <Field
          name="password"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={changeField}
        />
        <Field
          name="matchingPassword"
          type="password"
          placeholder="Confirmer le mot de passe"
          value={matchingPassword}
          onChange={changeField}
        />
        <div className="register-password-error-message">{passwordErrorMessage}</div>
        <button className="register-button" type="submit">Création</button>
      </form>
    </div>
  );
};

Register.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  matchingPassword: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default Register;
