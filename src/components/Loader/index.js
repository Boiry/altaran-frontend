import React from 'react';

import Image from 'src/assets/images/lock/lock8.svg';

import './loader.scss';

const Loader = () => (
  <div className="loader">
    <img src={Image} className="loader-image" />
  </div>
)

export default Loader;
