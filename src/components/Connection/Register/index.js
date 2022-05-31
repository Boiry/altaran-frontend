import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Field from '../Field';
import Loader from '../Loader';
import { setPage } from 'src/utils/router';
import './register.scss';

const Register = ({
  username,
  civilization,
  email,
  goToCivilizationsGuide,
  password,
  matchingPassword,
  usernameErrorMessage,
  passwordErrorMessage,
  changeField,
  handleLogin,
  registerSuccess,
  waiting,
  deleteUserMessages,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin();
  };

  const changePage = () => {
    goToCivilizationsGuide(true);
    setPage('presentation');
  }

  useEffect(() => {
    return () => {
      deleteUserMessages();
    };
  }, []);

  return (
    <div className="register">
      {!registerSuccess && !waiting &&
        <form className="register-form" onSubmit={handleSubmit}>
          <Field
            name="username"
            type="text"
            placeholder="Nom d'empire"
            value={username}
            onChange={changeField}
          />
          <label className="register-form-select" htmlFor="civilization-selection">Civilisation</label>
          <select id="civilization-selection" name="civilization" value={civilization} onChange={(e) => changeField(e.target.value, 'civilization')}>
            <option value="Arinesse">Arinesse</option>
            <option value="Zet-Ha">Zet-Ha</option>
            <option value="Xel-Nirr Ortolis">Xel-Nirr Ortolis</option>
            <option value="Kha'Od">Kha'Od</option>
            <option value="Kertsakar">Kertsakar</option>
            <option value="Xol To">Xol To</option>
          </select>
          <p onClick={changePage}>Comment choisir ?</p>
          <hr />
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
      }
      {registerSuccess && !waiting &&
        <p className="success">
          Votre demande a bien été prise en compte. Vous allez recevoir un email de confirmation afin d'activer votre compte.
        </p>
      }
      {waiting &&
        <div className="register-loader">
          <Loader />
        </div>
      }
    </div>
  );
};

Register.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  goToCivilizationsGuide: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  matchingPassword: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default Register;
