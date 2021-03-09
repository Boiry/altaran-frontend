import React from 'react';
import PropTypes from 'prop-types';

import Field from '../Field';
import './login.scss';

const Login = ({
  username,
  password,
  changeField,
  handleLogin,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin();
  };

  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit}>
        <Field
          name="username"
          type="text"
          placeholder="Nom d'empire"
          value={username}
          onChange={changeField}
        />
        <Field
          name="password"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={changeField}
        />
        <button className="login-button" type="submit">Connexion</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
