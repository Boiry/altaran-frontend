import React, { useEffect, useRef } from 'react';

import Message from './Message';
import './chat.scss';

import Corner from 'src/assets/images/corner.svg';

const Chat = ({ webSocketConnect, updateFieldValue, fieldValue, sendMessage, chatContent }) => {
  const messages = useRef();

  // WebSocket Connection
  useEffect(() => {
    webSocketConnect();
  }, []);

  const changeFieldValue = (e) => {
    updateFieldValue(e.target.value);
  }

  const submitMessage = (e) => {
    e.preventDefault();
    if (fieldValue) {
      sendMessage();
    }
  }

  useEffect(() => {
    messages.current.scrollTop = messages.current.scrollHeight;
  }, [chatContent]);

  return (
    <>
      <main className="chat">
        <div ref={messages} className="chat-messages">
        {chatContent.map((message) => (
          <Message
            key={message.key}
            author={message.author}
            date={message.date}
            content={message.content}
          />
        ))}
        </div>
        <form className="chat-messages-form" onSubmit={submitMessage}>
          <input className="chat-messages-field" onChange={changeFieldValue} value={fieldValue} />
        </form>
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
