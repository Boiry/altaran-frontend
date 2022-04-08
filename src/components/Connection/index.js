import React from 'react';

import Login from 'src/containers/Connection/Login';
import Register from 'src/containers/Connection/Register';
import ForgottenPassword from 'src/containers/Connection/ForgottenPassword';
import { getPage, setPage } from 'src/utils/router';

import './connection.scss';

const Connection = () => {
  const page = getPage();
  let loginTab = page === "login" ? "connection-tab-button connection-tab-active" : "connection-tab-button connection-tab-inactive";
  const registerTab = page === "register" ? "connection-tab-button connection-tab-active" : "connection-tab-button connection-tab-inactive";
  if (page === 'forgotten_password') loginTab = "connection-tab-button connection-tab-special";

  const forgottenPassword = () => {
    setPage('forgotten_password');
  }

  return (
    <>
      <div className="connection-tab">
        <button className={loginTab} onClick={() => setPage('login')}>Se connecter</button>
        <button className={registerTab} onClick={() => setPage('register')}>Nouveau compte</button>
      </div>
      {page === "login" && <Login forgottenPassword={forgottenPassword} />}
      {page === "register" && <Register />}
      {page === "forgotten_password" && <ForgottenPassword />}
    </>
  );
};

export default Connection;
