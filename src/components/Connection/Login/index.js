import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Field from '../Field';
import './login.scss';

import Waiting from 'src/assets/images/waiting.svg';
import { startAnimation, stopAnimation } from '../waitingWheelAnimation.js';

const Login = ({
  username,
  password,
  errorMessage,
  changeField,
  handleLogin,
  waiting,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin();
  };

  // Waiting wheel animation
  const waitingWheel = useRef();
  useEffect(() => {
    if (waiting && waitingWheel.current) {
      startAnimation(waitingWheel.current);
    }
    if (!waiting) {
      stopAnimation();
    }
  }, [waiting]);

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
          <div className="login-error-message">{errorMessage}</div>
          <button className="login-button" type="submit">Connexion</button>
        </form>
      }
      {waiting && <img src={Waiting} ref={waitingWheel} className="connection-waiting-wheel" />}
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
