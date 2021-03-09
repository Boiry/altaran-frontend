import React from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";

import './homeNav.scss';

const HomeNav = ({ page, goToPage }) => (
  <>
    <button className={classNames('home-nav-button', {'home-nav-active' : page==='home-overview'})} onClick={() => goToPage('home-overview')}>Présentation</button>
    <button className={classNames('home-nav-button', {'home-nav-active' : page==='home-empires'})} onClick={() => goToPage('home-empires')}>Empires</button>
    <button className={classNames('home-nav-button', {'home-nav-active' : page==='home-story'})} onClick={() => goToPage('home-story')}>Histoire</button>
    <button className="home-nav-button">Discord</button>
    <button className="home-nav-button">Forum</button>
    <button className="home-nav-button">Wiki</button>
    <button className={classNames('home-nav-button', {'home-nav-active' : page==='home-media'})} onClick={() => goToPage('home-media')}>Media</button>
  </>
);

HomeNav.propTypes = {
  page: PropTypes.string.isRequired,
  goToPage: PropTypes.func.isRequired,
};

export default HomeNav;
