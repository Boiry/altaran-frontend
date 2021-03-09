import React from 'react';

import Login from 'src/containers/Connection/Login';
import Register from 'src/containers/Connection/Register';

import './connection.scss';

const Connection = ({ page, goToPage }) => {
  if (page === undefined) {page = "login"};
  const loginTab = page === "login" ? "connection-login-tab-active" : "connection-login-tab-inactive";
  const registerTab = page === "register" ? "connection-register-tab-active" : "connection-register-tab-inactive";

  return (
    <div className="connection">
      <div className="connection-tab"></div>
        <div className={loginTab}>
          <div className="connection-tab-button" onClick={() => goToPage('login')}>Se connecter</div>
        </div>
        <div className={registerTab}>
          <div className="connection-tab-button" onClick={() => goToPage('register')}>Nouveau compte</div>
        </div>
      {page === "login" && <Login />}
      {page === "register" && <Register />}
    </div>
  );
};

export default Connection;
