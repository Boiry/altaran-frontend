import React, { useEffect, useRef, useState } from 'react';

import Message from './Message';
import './chat.scss';

import Corner from 'src/assets/images/corner.svg';

const Chat = ({
  webSocketConnect,
  webSocketConnected,
  changeChannel,
  updateFieldValue,
  messageTyping,
  fieldValue,
  sendMessage,
  chatContent
}) => {
  const messages = useRef();
  const typing = useRef();

  // WebSocket Connection
  useEffect(() => {
    if (!webSocketConnected) {
      webSocketConnect();
    }
  }, []);

  // Handle the change of channel
  const clickOnChannel = (channel) => {
    changeChannel(channel);
  }

  // Handle of typing in input
  let [timeout, set] = useState();
  const changeFieldValue = (e) => {
    updateFieldValue(e.target.value);
    set(clearTimeout(timeout));
    set(timeout = setTimeout(() => sendMessage("STOPTYPING"), 2000));
    sendMessage("TYPING");
  }

  // Displaying who's typing
  useEffect(() => {
    if (messageTyping.length > 0) {
      let message = '';
      if (messageTyping.length === 1) {
        message = `${messageTyping[0]} est en train d'écrire...`;
      } else {
        for (let i=0; i<messageTyping.length; i++) {
          message += messageTyping[i];
          if (i !== messageTyping.length -1) {
            message += ', ';
          } else {
            message += " sont en train d'écrire...";
          }
        }
      }
      typing.current.textContent = message;
    } else {
      typing.current.textContent = "";
    }
  }, [messageTyping])

  // Handle of the submit button
  const submitMessage = (e) => {
    e.preventDefault();
    if (fieldValue) {
      sendMessage("SEND");
      setReady(false);
    }
  }
  
  // Deals with name and date to display or not
  // Don't ask me for the useState, it works, that's it
  const [isReady, setReady] = useState();
  useEffect(() => {
    if (chatContent.length > 1) {
      const currentMessage = chatContent[chatContent.length-1];
      const lastMessage = chatContent[chatContent.length-2];
      const offsetDate = currentMessage.date - lastMessage.date;
      if (currentMessage.author === lastMessage.author && offsetDate < 600000) {
        currentMessage.hide = true;
      } else {
        currentMessage.hide = false;
      }
      setReady(true);
    }
  }, [chatContent])
  
  // Scroll to bottom when new message appears
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
              hide={message.hide}
            />
          ))}
        </div>
        <form className="chat-messages-form" onSubmit={submitMessage}>
          <input className="chat-messages-field" onChange={changeFieldValue} value={fieldValue} />
        </form>
        <div ref={typing} className="chat-messages-typing"></div>
        <img src={Corner} className="corner corner-top-left" />
        <img src={Corner} className="corner corner-top-right" />
        <img src={Corner} className="corner corner-bottom-left" />
        <img src={Corner} className="corner corner-bottom-right" />
      </main>
      <aside className="chat-channels">
        <div className="chat-channels-channel" onClick={() => clickOnChannel('main')}>Général</div>
        <div className="chat-channels-channel" onClick={() => clickOnChannel('help')}>Aide</div>
        <div className="chat-channels-channel" onClick={() => clickOnChannel('alliance')}>Alliance</div>
        <img src={Corner} className="corner corner-top-left" />
        <img src={Corner} className="corner corner-top-right" />
        <img src={Corner} className="corner corner-bottom-left" />
        <img src={Corner} className="corner corner-bottom-right" />
      </aside>
    </>
  );
};

export default Chat;
