import React from 'react';

import Login from 'src/containers/Connection/Login';
import Register from 'src/containers/Connection/Register';
import { getPage, setPage } from 'src/utils/router';

import './connection.scss';

const Connection = () => {
  const page = getPage();
  if (page === undefined) {page = "login"};
  const loginTab = page === "login" ? "connection-login-tab-active" : "connection-login-tab-inactive";
  const registerTab = page === "register" ? "connection-register-tab-active" : "connection-register-tab-inactive";

  return (
    <div className="connection">
      <div className="connection-tab"></div>
        <div className={loginTab}>
          <div className="connection-tab-button" onClick={() => setPage('login')}>Se connecter</div>
        </div>
        <div className={registerTab}>
          <div className="connection-tab-button" onClick={() => setPage('register')}>Nouveau compte</div>
        </div>
      {page === "login" && <Login />}
      {page === "register" && <Register />}
    </div>
  );
};

export default Connection;
