import React from 'react';

import './Message.css';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();
  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    <div className={`message-container ${isSentByCurrentUser && 'message-user-container'}`}>
      <div className="message-box">
        <p>{text}</p>
      </div>
      <p className={isSentByCurrentUser ? 'message-user-name' : 'message-friend-name'}>{isSentByCurrentUser ? trimmedName : user}</p>
    </div>
  );
};

export default Message;
