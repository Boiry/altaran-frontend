import React from 'react';

import './message.scss';

const Message = ({ author, date, content }) => {
  const formatDate = (timestamp) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const date = new Date(timestamp);
    return date.toLocaleDateString('fr-FR', options);
  }
  return (
    <div className="chat-message">
      <span className="chat-message-author">{author}</span>
      <span className="chat-message-date">{formatDate(date)}</span>
      <p className="chat-message-content">{content}</p>
    </div>
  )
};

export default Message;
