import React from 'react';

import './resetPassword.scss';

import Loader from '../Loader';
import Corner from 'src/assets/images/corner.svg';

const ResetPassword = ({
  resetPassword,
  waiting,
  success,
  errorMessage,
}) => {
  let newPassword, matchingNewPassword;
  const changeNewPassword = (e) => {
    newPassword = e.target.value;
  };

  const changeMatchingNewPassword = (e) => {
    matchingNewPassword = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(newPassword, matchingNewPassword);
  };

  return (
    <form className="reset-password-form">
      {!waiting && !success &&
        <>
          <p className="reset-password-paragraph">Veuillez renseigner votre nouveau mot de passe.</p>
          <label className="reset-password-label" htmlFor="reset-password-first-input">Mot de passe</label>
          <input className="reset-password-input" id="reset-password-first-input" type="password" onChange={changeNewPassword}></input>
          <label className="reset-password-label" htmlFor="reset-password-second-input">Confirmation du mot de passe</label>
          <input className="reset-password-input" id="reset-password-second-input" type="password" onChange={changeMatchingNewPassword}></input>
          <p className="reset-password-error-message">{errorMessage}</p>
          <button className="reset-password-button" type="submit" onClick={handleSubmit}>Valider</button>
        </>
      }
      {waiting && <Loader />}
      {!waiting && success &&
        <h1 className="reset-password-success-message">Votre nouveau mot de passe a bien été pris en compte, vous pouvez désormais vous connecter.</h1>
      }
      <img src={Corner} className="corner corner-top-left" />
      <img src={Corner} className="corner corner-top-right" />
      <img src={Corner} className="corner corner-bottom-left" />
      <img src={Corner} className="corner corner-bottom-right" />
    </form>
  );
};

export default ResetPassword;
