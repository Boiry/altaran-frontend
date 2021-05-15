import React, { useEffect } from 'react';

import './chat.scss';

import Corner from 'src/assets/images/corner.svg';

const Chat = ({ webSocketConnect }) => {

  useEffect(() => {
    webSocketConnect();
  })

  return (
    <>
      <main className="chat">
        <div className="messages"></div>
        <img src={Corner} className="corner corner-top-left" />
        <img src={Corner} className="corner corner-top-right" />
        <img src={Corner} className="corner corner-bottom-left" />
        <img src={Corner} className="corner corner-bottom-right" />
      </main>
      <aside className="chat-channels">
        <div className="chat-channels-channel">Général</div>
        <div className="chat-channels-channel">Aide</div>
        <div className="chat-channels-channel">Alliance</div>
        <img src={Corner} className="corner corner-top-left" />
        <img src={Corner} className="corner corner-top-right" />
        <img src={Corner} className="corner corner-bottom-left" />
        <img src={Corner} className="corner corner-bottom-right" />
      </aside>
    </>
  );
};

export default Chat;
