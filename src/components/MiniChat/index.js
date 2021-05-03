import React from 'react';

import Corner from 'src/assets/images/corner.svg';
import Open from 'src/assets/images/open.svg';

import './miniChat.scss';

const MiniChat = () => {

  return (
    <div className="minichat">
      <img src={Corner} className="corner corner-top-left" />
      <img src={Corner} className="corner corner-top-right" />
      <img src={Corner} className="corner corner-bottom-left" />
      <img src={Corner} className="corner corner-bottom-right" />
      <div className="minichat-menu">
        <div className="minichat-header">
          <div className="minichat-header-channel">Général</div>
          <img src={Open} className="minichat-header-open" />
          <div className="minichat-header-shrink">▼</div>
          <div className="minichat-header-close">X</div>
        </div>
      </div>
      <div className="minichat-content">
        <div className="minichat-content-message minichat-content-message1">
          Donne-moi tous tes bidous ou je te démolis !
        </div>
        <div className="minichat-content-message minichat-content-message2">
          Va crever t'auras pas la queue d'une patoune !
        </div>
      </div>
      <input className="minichat-field" type="text" />
    </div>
  );

};

export default MiniChat;
