import React from 'react';

import Login from 'src/containers/Connection/Login';
import Register from 'src/containers/Connection/Register';
import { getPage, setPage } from 'src/utils/router';

import './connection.scss';

const Connection = () => {
  const page = getPage();
  if (page === undefined) {page = "login"};
  const loginTab = page === "login" ? "connection-tab-button connection-tab-active" : "connection-tab-button connection-tab-inactive";
  const registerTab = page === "register" ? "connection-tab-button connection-tab-active" : "connection-tab-button connection-tab-inactive";

  return (
    <>
      <div className="connection-tab">
        <button className={loginTab} onClick={() => setPage('login')}>Se connecter</button>
        <button className={registerTab} onClick={() => setPage('register')}>Nouveau compte</button>
      </div>
      {page === "login" && <Login />}
      {page === "register" && <Register />}
    </>
  );
};

export default Connection;
