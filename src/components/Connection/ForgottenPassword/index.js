import React, { useEffect } from 'react';

import Loader from '../Loader';
import './forgottenPassword.scss';

const ForgottenPassword = ({
  forgottenPassword,
  successMessage,
  errorMessage,
  waiting,
  deleteUserMessages,
}) => {
  let email;

  const changeField = (e) => {
    email = e.target.value;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    forgottenPassword(email);
  }

  useEffect(() => {
    return () => {
      deleteUserMessages();
    };
  }, []);

 return (
    <div className="forgotten-password">
      {!waiting && !successMessage &&
        <form className="forgotten-password-form" onSubmit={handleSubmit}>
          <div>Veuillez entrer votre adresse email, un message vous sera envoyé afin de réinitialiser votre mot de passe.</div>
          <input className="forgotten-password-input" type="email" placeholder="Email" onChange={changeField}></input>
          <div className="forgotten-password-error-message">{errorMessage}</div>
          <button className="forgotten-password-button" type="submit">Envoyer</button>
        </form>
      }
      {waiting &&
        <div className="forgotten-password-loader">
          <Loader />
        </div>
      }
      {!waiting && successMessage &&
        <div className="forgotten-password-success-message">{successMessage}</div>
      }
    </div>
  );
};

export default ForgottenPassword;
