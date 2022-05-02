import React from 'react';

import './resource.scss';

import Zero from 'src/assets/images/zero.svg';
import DoubleArrow from 'src/assets/images/double-arrow.svg';

const Resource = ({ name, empty, fullfill }) => {

  return (
    <div className="ships-orders-frame-end-resource">
      {name}
      <img src={Zero} onClick={empty} width='10px' />
      <img src={DoubleArrow} onClick={fullfill} width='20px' />
    </div>
  );
};

export default Resource;
