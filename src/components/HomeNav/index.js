import React from 'react';
import classNames from "classnames";

import { getPage, setPage } from 'src/utils/router';

import './homeNav.scss';

const HomeNav = () => (
  <>
    <button className={classNames('home-nav-button', {'home-nav-active' : getPage()==='home-overview'})} onClick={() => setPage('home-overview')}>Présentation</button>
    <button className={classNames('home-nav-button', {'home-nav-active' : getPage()==='home-empires'})} onClick={() => setPage('home-empires')}>Empires</button>
    <button className={classNames('home-nav-button', {'home-nav-active' : getPage()==='home-story'})} onClick={() => setPage('home-story')}>Histoire</button>
    <button className="home-nav-button">Discord</button>
    <button className="home-nav-button">Forum</button>
    <button className="home-nav-button">Wiki</button>
    <button className={classNames('home-nav-button', {'home-nav-active' : getPage()==='home-media'})} onClick={() => setPage('home-media')}>Media</button>
  </>
);

export default HomeNav;
