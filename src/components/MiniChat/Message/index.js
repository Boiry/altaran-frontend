import React, { useEffect, useRef } from 'react';

import './message.scss';

const Message = ({ author, content }) => {
  const user = sessionStorage.username;
  const mainDiv = useRef();

  useEffect(() => {
    if (author === user) {
      mainDiv.current.className = 'mini-chat-message mini-chat-message-user';
    } else {
      mainDiv.current.className = 'mini-chat-message mini-chat-message-not-user';
    }
  }, [])

  return (
    <div ref={mainDiv}>
      <p className="mini-chat-message-author">{author}</p>
      <p className="mini-chat-message-content">{content}</p>
    </div>
  )
};

export default Message;
