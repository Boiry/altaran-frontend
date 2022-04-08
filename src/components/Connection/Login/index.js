import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Field from '../Field';
import Loader from '../Loader';
import './login.scss';

const Login = ({
  username,
  password,
  errorMessage,
  changeField,
  handleLogin,
  forgottenPassword,
  waiting,
  deleteUserMessages,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin();
  };

  useEffect(() => {
    return () => {
      deleteUserMessages();
    };
  }, []);

  return (
    <div className="login">
      {!waiting &&
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
          <div className="login-forgotten-password" onClick={forgottenPassword}>Mot de passe oublié ?</div>
          <div className="login-error-message">{errorMessage}</div>
          <button className="login-button" type="submit">Connexion</button>
        </form>
      }
      {waiting &&
        <div className="login-loader">
          <Loader />
        </div>
        }
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
