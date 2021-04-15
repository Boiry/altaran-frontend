import React from 'react';

import './log.scss';

import Corner from '../../assets/images/corner.svg'; 

const Log = () => {
  return (
    <div className="log">
      <img src={Corner} className="corner corner-top-left" />
      <img src={Corner} className="corner corner-top-right" />
      <img src={Corner} className="corner corner-bottom-left" />
      <img src={Corner} className="corner corner-bottom-right" />
    </div>
  );
};

export default Log;
